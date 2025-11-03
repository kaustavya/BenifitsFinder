import { RequestHandler } from "express";

// This file provides a minimal DigiLocker OAuth flow handler.
// It expects the following environment variables to be set:
// - DIGILOCKER_CLIENT_ID
// - DIGILOCKER_CLIENT_SECRET
// - DIGILOCKER_REDIRECT_URI

const DIGI_AUTH_URL = "https://dev.digilocker.gov.in/public/oauth2/1/authorize";
const DIGI_TOKEN_URL = "https://dev.digilocker.gov.in/public/oauth2/1/token";

export const initDigilocker: RequestHandler = (req, res) => {
  const clientId = process.env.DIGILOCKER_CLIENT_ID;
  const redirectUri = process.env.DIGILOCKER_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return res.status(500).json({ error: "Digilocker client id or redirect uri not configured on server." });
  }

  const state = Math.random().toString(36).slice(2);
  // store state in a real implementation (cookie/session) to validate in callback

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
    scope: "Aadhaar Offline KYC",
  });

  const url = `${DIGI_AUTH_URL}?${params.toString()}`;
  // For SPA we can return the URL to the client which will redirect the browser.
  res.json({ url });
};

export const digilockerCallback: RequestHandler = async (req, res) => {
  const code = req.query.code as string | undefined;
  if (!code) return res.status(400).send("Missing code");

  const clientId = process.env.DIGILOCKER_CLIENT_ID;
  const clientSecret = process.env.DIGILOCKER_CLIENT_SECRET;
  const redirectUri = process.env.DIGILOCKER_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return res.status(500).send("Server not configured for Digilocker token exchange.");
  }

  try {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });

    const resp = await fetch(DIGI_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return res.status(502).send(`Failed to exchange token: ${text}`);
    }

    const data = await resp.json();
    // In a real app, create a session and persist the tokens. For demo, redirect with success.
    // Redirect to client with token data (NOT SECURE for production)
    const redirectTo = `/results?digilocker_token=${encodeURIComponent(data.access_token || "")}`;
    res.redirect(302, redirectTo);
  } catch (err: any) {
    res.status(500).send(`Token exchange error: ${err.message}`);
  }
};
