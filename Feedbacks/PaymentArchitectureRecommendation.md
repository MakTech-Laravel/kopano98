# Payment architecture recommendation

**Date:** 6 Nov 2026  
**Product:** Launchpad Careers  
**Decision requested:** Approve dual-gateway approach before production cutover

## Preferred approach (B)

Use **Payfast for South Africa, Namibia, and Botswana** and **Paddle for all other countries**.

### Why B over A (Paddle-only)

| Criterion | A: Paddle only | B: Payfast + Paddle (recommended) |
|---|---|---|
| Local SA methods | Weaker Instant EFT / local familiarity | Payfast is established for SA cards + EFT |
| International tax/FX | Strong | Strong via Paddle |
| SA business fit | Possible, but eligibility/fees must be confirmed with Paddle sales | Matches current storefront UX and catalogue priced in ZAR |
| Complexity | Lower | Medium — two webhooks, two dashboards |
| Amount integrity | Paddle FX | Payfast always charges **ZAR catalogue total**; Paddle shows local currency |

## Country / currency behaviour

- Auto-detect region (ipapi.co + browser locale fallback), with manual override.
- Display currencies are estimated FX for browsing.
- **Payfast charge amount = server catalogue ZAR total** (never a converted display amount).
- International checkout uses Paddle overlay when `PADDLE_CLIENT_TOKEN` + `PADDLE_PRICE_ID` are configured.

## Integration requirements

1. Payfast sandbox merchant id/key (+ passphrase) and ITN webhook to `/webhooks/payfast`.
2. Paddle Billing client token, price id, webhook secret for `/webhooks/paddle`.
3. Server-side catalogue pricing (`config/launchpad.php`) — client prices are not trusted.
4. Confirmation email on paid webhook.

## Limitations

- Until gateway keys are present, checkout still creates a pending order and sends the customer to thank-you.
- Paddle currently uses a single configured price id for overlay checkout; multi-line catalogue syncing to Paddle prices is a follow-up.
- Display FX rates are static estimates until a live FX/Paddle price catalogue is connected.
- Company logo assets and final production domain remain client dependencies.

## Approval gate

Do **not** migrate DNS or enable live credentials on the revenue domain until the client approves architecture **B** and supplies sandbox/live keys.
