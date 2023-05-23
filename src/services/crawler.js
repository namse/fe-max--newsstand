import puppeteer from "puppeteer";
import cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export function initDB() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  async function getWebPageContent(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    const html = await page.content();
    await browser.close();
    return html;
  }

  async function getHeadline(url) {
    try {
      const html = await getWebPageContent(url);
      const match = html.match(/PC-NEWSSTAND-YONHAP(.*)PC-NEWSSTAND-YONHAP/);
      if (match && match[1]) {
        const titles = match[1].match(/"title":"(.*?)","url"/g).map((m) => m.replace(/"title":"|","url"/g, "").replace(/\\/g, ""));
        return titles;
      } else {
        console.log("No matching content found");
      }
    } catch (err) {
      console.error("Failed to fetch page: ", err);
    }
  }

  async function getPressBrandMark(url) {
    try {
      const html = await getWebPageContent(url);
      const $ = cheerio.load(html);
      const elements = Array.from($(".MediaSubscriptionView-module__subscription_box___YshKW img"));
      const elementData = elements.map((img) => ({
        src: $(img).attr("src"),
        alt: $(img).attr("alt"),
      }));
      return elementData;
    } catch (err) {
      console.error("Failed to fetch page: ", err);
    }
  }

  async function writeToDb(url1, url2) {
    const headlines = await getHeadline(url1);
    const pressMarks = await getPressBrandMark(url2);
    const data = {
      headlines,
      pressMarks,
    };
    fs.writeFileSync(path.join(__dirname, "db.json"), JSON.stringify(data, null, 2));
  }

  writeToDb("http://www.naver.com", "https://www.naver.com").catch((err) => console.error("Failed to fetch page: ", err));
}

initDB();
