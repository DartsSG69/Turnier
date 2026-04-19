export default async function handler(req, res) {
  try {
//   const url = `https://backend5.3k-darts.com/2k-backend5/api/v1/frontend/event/19628?t=${Date.now()}`;
const url = `https://backend6.3k-darts.com/2k-backend6/api/v1/frontend/event/3973/phase/5708/round/0?t=${Date.now()}`;
//Score SG Turnier - 	const url = `https://backend6.3k-darts.com/2k-backend6/api/v1/frontend/event/983/phase/5529?t=${Date.now()}`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "User-Agent": "Mozilla/5.0",
        Referer: "https://portal.3k-darts.com/",
        Origin: "https://portal.3k-darts.com",
        "Cache-Control": "no-cache",
        Pragma: "no-cache"
      }
    });

    const text = await response.text();
    const contentType = response.headers.get("content-type") || "";

    res.setHeader("Access-Control-Allow-Origin", "*");

    if (!response.ok) {
      return res.status(response.status).send(text);
    }

    if (!contentType.includes("application/json")) {
      return res.status(500).json({
        error: "Upstream liefert kein JSON",
        contentType,
        preview: text.slice(0, 500)
      });
    }

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
