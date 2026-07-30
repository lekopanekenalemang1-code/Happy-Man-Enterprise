import { Router, type IRouter, type Request } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";

const router: IRouter = Router();
const connectors = new ReplitConnectors();
const ORDER_EMAIL = "happymanrentals@outlook.com";
const MAX_PROOF_BYTES = 8 * 1024 * 1024;

type OrderBody = {
  orderNumber?: unknown;
  paymentRef?: unknown;
  product?: {
    brand?: unknown;
    series?: unknown;
    model?: unknown;
    storage?: unknown;
    color?: unknown;
    price?: unknown;
  };
  customer?: {
    name?: unknown;
    phone?: unknown;
    email?: unknown;
    country?: unknown;
    cityTownVillage?: unknown;
    ward?: unknown;
    plotNumber?: unknown;
    additionalDeliveryInfo?: unknown;
  };
  paymentMethod?: unknown;
  proof?: {
    fileName?: unknown;
    contentType?: unknown;
    contentBase64?: unknown;
  };
};

const text = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const formatOrderDate = () =>
  new Intl.DateTimeFormat("en-BW", {
    dateStyle: "long",
    timeZone: "Africa/Gaborone",
  }).format(new Date());

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    character =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );

const row = (label: string, value: string) =>
  `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`;

type MailMessage = {
  subject: string;
  body: {
    contentType: "HTML";
    content: string;
  };
  toRecipients: Array<{ emailAddress: { address: string } }>;
  replyTo?: Array<{ emailAddress: { address: string } }>;
  attachments?: Array<{
    "@odata.type": "#microsoft.graph.fileAttachment";
    name: string;
    contentType: string;
    contentBytes: string;
  }>;
};

const sendOutlookMail = (message: MailMessage) =>
  connectors.proxy("outlook", "/v1.0/me/sendMail", {
    method: "POST",
    body: { message, saveToSentItems: true },
  });

function getOrderBody(req: Request): OrderBody {
  return req.body as OrderBody;
}

router.post("/orders", async (req, res) => {
  const body = getOrderBody(req);
  const product = body.product;
  const customer = body.customer;
  const proof = body.proof;

  const required = [
    text(body.orderNumber),
    text(body.paymentRef),
    text(product?.brand),
    text(product?.series),
    text(product?.model),
    text(product?.storage),
    text(product?.color),
    text(customer?.name),
    text(customer?.phone),
    text(customer?.email),
    text(customer?.country),
    text(customer?.cityTownVillage),
    text(customer?.ward),
    text(customer?.plotNumber),
    text(customer?.additionalDeliveryInfo),
    text(body.paymentMethod),
    text(proof?.fileName),
    text(proof?.contentType),
    text(proof?.contentBase64),
  ];

  if (required.some(value => value.length === 0)) {
    res.status(400).json({ error: "Please complete all order, customer, payment, and delivery details." });
    return;
  }

  if (customer?.country !== "Botswana") {
    res.status(400).json({ error: "Orders are currently available for Botswana only." });
    return;
  }

  const price = typeof product?.price === "number" && Number.isFinite(product.price)
    ? product.price
    : Number.NaN;
  if (!Number.isFinite(price) || price <= 0) {
    res.status(400).json({ error: "The order price is invalid." });
    return;
  }

  const contentBase64 = text(proof?.contentBase64);
  const proofBytes = Math.floor(contentBase64.length * 3 / 4);
  if (proofBytes <= 0 || proofBytes > MAX_PROOF_BYTES) {
    res.status(413).json({ error: "Proof of payment must be smaller than 8MB." });
    return;
  }

  const orderNumber = text(body.orderNumber);
  const paymentRef = text(body.paymentRef);
  const productName = text(product?.model);
  const customerEmail = text(customer?.email);
  const orderDate = formatOrderDate();
  const priceLabel = `P${price.toLocaleString("en-US")}`;
  const internalSubject = `New Tech Inc order ${orderNumber} — ${productName}`;
  const internalHtml = `
    <h2>New Tech Inc order</h2>
    <p><strong>Order number:</strong> ${escapeHtml(orderNumber)}<br />
    <strong>Order date:</strong> ${escapeHtml(orderDate)}<br />
    <strong>Payment reference:</strong> ${escapeHtml(paymentRef)}<br />
    <strong>Payment method:</strong> ${escapeHtml(text(body.paymentMethod))}</p>
    <h3>Product</h3>
    <table>${row("Brand", text(product?.brand))}${row("Series", text(product?.series))}${row("Model", productName)}${row("Storage", text(product?.storage))}${row("Color", text(product?.color))}${row("Price", priceLabel)}${row("Price note", "Inclusive of all costs, customs, and shipping.")}</table>
    <h3>Customer</h3>
    <table>${row("Name", text(customer?.name))}${row("Phone number", text(customer?.phone))}${row("Email", customerEmail)}</table>
    <h3>Delivery address</h3>
    <table>${row("Country of residence", "Botswana")}${row("City / Town / Village", text(customer?.cityTownVillage))}${row("Ward", text(customer?.ward))}${row("Plot number", text(customer?.plotNumber))}${row("Additional delivery information", text(customer?.additionalDeliveryInfo))}</table>
  `;
  const customerSubject = `Your Tech Inc order confirmation — ${orderNumber}`;
  const customerHtml = `
    <div style="font-family:Arial,sans-serif;max-width:640px;color:#202124;line-height:1.5">
      <h2 style="margin-bottom:4px">Thank you for placing your order</h2>
      <p>Dear ${escapeHtml(text(customer?.name))},</p>
      <p>We have received your order and proof of payment. This email serves as your order confirmation and receipt. Our team will now process your refurbished phone order.</p>
      <h3>Order summary</h3>
      <table style="border-collapse:collapse">${row("Order number", orderNumber)}${row("Order date", orderDate)}${row("Payment reference", paymentRef)}${row("Payment method", text(body.paymentMethod))}${row("Phone", `${text(product?.brand)} ${text(product?.series)} ${productName}`)}${row("Storage", text(product?.storage))}${row("Color", text(product?.color))}${row("Total price", priceLabel)}${row("Price note", "Inclusive of all costs, customs, and shipping.")}</table>
      <h3>Delivery address</h3>
      <table style="border-collapse:collapse">${row("Country", "Botswana")}${row("City / Town / Village", text(customer?.cityTownVillage))}${row("Ward", text(customer?.ward))}${row("Plot number", text(customer?.plotNumber))}${row("Additional information", text(customer?.additionalDeliveryInfo))}</table>
      <p style="margin-top:20px">If you have any enquiries, please reply to this email or contact us by WhatsApp or call on <strong>+267 74066703</strong>.</p>
      <p>Thank you for choosing Tech Inc.</p>
      <p style="color:#666">Happy Man Enterprise PTY LTD<br />happymanrentals@outlook.com</p>
    </div>
  `;

  try {
    const internalResponse = await sendOutlookMail({
      subject: internalSubject,
      body: { contentType: "HTML", content: internalHtml },
      toRecipients: [{ emailAddress: { address: ORDER_EMAIL } }],
      replyTo: [{ emailAddress: { address: customerEmail } }],
      attachments: [
        {
          "@odata.type": "#microsoft.graph.fileAttachment",
          name: text(proof?.fileName),
          contentType: text(proof?.contentType),
          contentBytes: contentBase64,
        },
      ],
    });

    if (!internalResponse.ok) {
      const errorText = await internalResponse.text().catch(() => "");
      req.log.error({ status: internalResponse.status, responseLength: errorText.length }, "Outlook internal order email failed");
      res.status(502).json({ error: "We could not send the order email. Please try again." });
      return;
    }

    const customerResponse = await sendOutlookMail({
      subject: customerSubject,
      body: { contentType: "HTML", content: customerHtml },
      toRecipients: [{ emailAddress: { address: customerEmail } }],
      replyTo: [{ emailAddress: { address: ORDER_EMAIL } }],
    });

    if (!customerResponse.ok) {
      const errorText = await customerResponse.text().catch(() => "");
      req.log.error({ status: customerResponse.status, responseLength: errorText.length }, "Outlook customer receipt email failed");
      res.status(502).json({ error: "The order was received, but we could not send the customer receipt. Please try again." });
      return;
    }

    req.log.info({ orderNumber }, "Internal order and customer receipt emails sent");
    res.status(202).json({ status: "sent", orderNumber });
  } catch (error) {
    req.log.error({ err: error, orderNumber }, "Order email request failed");
    res.status(502).json({ error: "We could not send the order email. Please try again." });
  }
});

export default router;