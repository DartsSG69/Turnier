export default async function handler(req, res) {
  try {
    const rawMatchId = Array.isArray(req.query.matchId)
      ? req.query.matchId[0]
      : (req.query.matchId || req.query.id);

    const matchId = String(rawMatchId || '').trim();

    if (!/^\d+$/.test(matchId)) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(400).json({
        error: 'Ungültige oder fehlende matchId',
        example: '/api/liga-boards?matchId=1500322'
      });
    }

    const url = `https://live.3k-darts.com/dartsscorer-liveticker/api/v1/match/5/0/${matchId}?t=${Date.now()}`;

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0',
        Referer: 'https://portal.3k-darts.com/',
        Origin: 'https://portal.3k-darts.com',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache'
      }
    });

    const text = await response.text();
    const contentType = response.headers.get('content-type') || '';

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store, max-age=0');

    if (!response.ok) {
      return res.status(response.status).send(text);
    }

    if (!contentType.includes('application/json')) {
      return res.status(500).json({
        error: 'Upstream liefert kein JSON',
        contentType,
        preview: text.slice(0, 500)
      });
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).send(text);
  } catch (error) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: error.message });
  }
}
