/**
 * Vercel Serverless API - Verify Custom Domain DNS
 * Endpoint: POST /api/custom-domain/verify/[domainId]
 */

import { Pool } from 'pg';
import dns from 'dns';
import { promisify } from 'util';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const resolveTxt = promisify(dns.resolveTxt);
const resolveCname = promisify(dns.resolveCname);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { domainId } = req.query;

  if (!domainId) {
    return res.status(400).json({ error: 'Domain ID is required' });
  }

  try {
    const client = await pool.connect();
    
    try {
      // Get domain info
      const domainResult = await client.query(
        `SELECT * FROM custom_domains WHERE id = $1`,
        [domainId]
      );

      if (domainResult.rows.length === 0) {
        return res.status(404).json({ error: 'Domain not found' });
      }

      const domainInfo = domainResult.rows[0];
      let verified = false;
      let dnsConfigured = false;

      // Check TXT record for verification
      try {
        const txtRecords = await resolveTxt(`_vercel.${domainInfo.domain}`);
        const flattenedRecords = txtRecords.flat();
        
        if (flattenedRecords.includes(domainInfo.verification_token)) {
          verified = true;
        }
      } catch (error) {
        console.log('TXT record not found or error:', error.message);
      }

      // Check CNAME record
      try {
        const cnameRecords = await resolveCname(domainInfo.domain);
        if (cnameRecords.some(record => record.includes('vercel') || record.includes('cname'))) {
          dnsConfigured = true;
        }
      } catch (error) {
        console.log('CNAME record not found or error:', error.message);
      }

      // Update domain status
      if (verified && dnsConfigured) {
        await client.query(
          `UPDATE custom_domains
           SET verified = true, 
               dns_configured = true,
               verified_at = CURRENT_TIMESTAMP,
               updated_at = CURRENT_TIMESTAMP
           WHERE id = $1`,
          [domainId]
        );

        await client.query(
          `UPDATE digital_cards
           SET custom_domain_verified = true,
               custom_domain_verified_at = CURRENT_TIMESTAMP
           WHERE id = $1`,
          [domainInfo.card_id]
        );

        res.status(200).json({ 
          verified: true, 
          dnsConfigured: true,
          message: 'Domain verified successfully!' 
        });
      } else {
        res.status(200).json({ 
          verified: false, 
          dnsConfigured,
          message: 'DNS records not configured correctly yet. Please wait a few minutes and try again.' 
        });
      }
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error verifying domain:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
