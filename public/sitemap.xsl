<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
>
  <xsl:output
    method="html"
    encoding="UTF-8"
    omit-xml-declaration="yes"
  />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <title>XML Sitemap · FreeCodeDocs</title>

        <style>
          * {
            box-sizing: border-box;
          }

          html {
            background: #ffffff;
          }

          body {
            margin: 0;
            color: #14171f;
            background: #ffffff;
            font-family:
              Inter,
              system-ui,
              -apple-system,
              BlinkMacSystemFont,
              "Segoe UI",
              sans-serif;
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
          }

          .wrapper {
            width: min(1100px, calc(100% - 32px));
            margin: 0 auto;
            padding: 64px 0;
          }

          .header {
            margin-bottom: 28px;
          }

          .brand {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 22px;
            color: #14171f;
            font-family: inherit;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: -0.01em;
            text-decoration: none;
          }

          .brand-mark {
            display: grid;
            width: 28px;
            height: 28px;
            place-items: center;
            border-radius: 6px;
            color: #ffffff;
            background: #14171f;
            font-family:
              "JetBrains Mono",
              ui-monospace,
              SFMono-Regular,
              Menlo,
              Monaco,
              Consolas,
              monospace;
            font-size: 11px;
          }

          h1 {
            margin: 0;
            font-size: clamp(28px, 4vw, 40px);
            line-height: 1.1;
            font-weight: 600;
            letter-spacing: -0.025em;
          }

          .description {
            max-width: 620px;
            margin: 10px 0 0;
            color: #5f6675;
            font-size: 15px;
          }

          .meta {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 20px;
          }

          .badge {
            display: inline-flex;
            align-items: center;
            min-height: 30px;
            padding: 0 10px;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            color: #5f6675;
            background: #ffffff;
            font-family:
              "JetBrains Mono",
              ui-monospace,
              SFMono-Regular,
              Menlo,
              Monaco,
              Consolas,
              monospace;
            font-size: 12px;
          }

          .badge strong {
            color: #2b4fc7;
            font-weight: 600;
          }

          .table-wrap {
            overflow: hidden;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            background: #ffffff;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th {
            padding: 13px 18px;
            border-bottom: 1px solid #e5e7eb;
            color: #5f6675;
            background: #f6f7f9;
            font-family:
              "JetBrains Mono",
              ui-monospace,
              SFMono-Regular,
              Menlo,
              Monaco,
              Consolas,
              monospace;
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 0.04em;
            text-align: left;
            text-transform: uppercase;
          }

          td {
            padding: 15px 18px;
            border-bottom: 1px solid #eef0f2;
            font-size: 14px;
            vertical-align: middle;
          }

          tr:last-child td {
            border-bottom: 0;
          }

          tr:hover td {
            background: #f6f7f9;
          }

          .url {
            overflow-wrap: anywhere;
          }

          a {
            color: #2b4fc7;
            text-decoration: none;
          }

          a:hover {
            text-decoration: underline;
            text-underline-offset: 3px;
          }

          .brand:hover {
            text-decoration: none;
          }

          .date {
            width: 180px;
            color: #5f6675;
            white-space: nowrap;
            font-family:
              "JetBrains Mono",
              ui-monospace,
              SFMono-Regular,
              Menlo,
              Monaco,
              Consolas,
              monospace;
            font-size: 12px;
          }

          .changefreq {
            width: 130px;
            color: #5f6675;
            font-family:
              "JetBrains Mono",
              ui-monospace,
              SFMono-Regular,
              Menlo,
              Monaco,
              Consolas,
              monospace;
            font-size: 12px;
          }

          .priority {
            width: 90px;
            color: #5f6675;
            font-family:
              "JetBrains Mono",
              ui-monospace,
              SFMono-Regular,
              Menlo,
              Monaco,
              Consolas,
              monospace;
            font-size: 12px;
          }

          .empty {
            padding: 32px 18px;
            color: #5f6675;
            background: #f6f7f9;
            text-align: center;
          }

          .footer {
            margin-top: 18px;
            color: #9ba1ad;
            font-size: 12px;
          }

          @media (max-width: 700px) {
            .wrapper {
              width: min(100% - 20px, 1100px);
              padding: 36px 0;
            }

            .table-wrap {
              overflow-x: auto;
            }

            table {
              min-width: 700px;
            }
          }
        </style>
      </head>

      <body>
        <main class="wrapper">
          <header class="header">
            <a class="brand" href="/">
              <span class="brand-mark">&lt;/&gt;</span>
              <span>FreeCodeDocs</span>
            </a>

            <h1>XML Sitemap</h1>

            <p class="description">
              This sitemap contains URLs available for search engine
              discovery.
            </p>

            <div class="meta">
              <span class="badge">
                <xsl:choose>
                  <xsl:when test="sitemap:sitemapindex">
                    Sitemap Index
                  </xsl:when>
                  <xsl:otherwise>
                    URL Set
                  </xsl:otherwise>
                </xsl:choose>
              </span>

              <span class="badge">
                <strong>
                  <xsl:choose>
                    <xsl:when test="sitemap:sitemapindex">
                      <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)" />
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:value-of select="count(sitemap:urlset/sitemap:url)" />
                    </xsl:otherwise>
                  </xsl:choose>
                </strong>
                &#160;entries
              </span>
            </div>
          </header>

          <section class="table-wrap">
            <xsl:choose>

              <!-- Sitemap index -->
              <xsl:when test="sitemap:sitemapindex">
                <table>
                  <thead>
                    <tr>
                      <th>Sitemap</th>
                    </tr>
                  </thead>

                  <tbody>
                    <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                      <tr>
                        <td class="url">
                          <a href="{sitemap:loc}">
                            <xsl:value-of select="sitemap:loc" />
                          </a>
                        </td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </xsl:when>

              <!-- Normal URL sitemap -->
              <xsl:when test="sitemap:urlset">
                <table>
                  <thead>
                    <tr>
                      <th>URL</th>
                      <th>Last Modified</th>
                      <th>Change Frequency</th>
                      <th>Priority</th>
                    </tr>
                  </thead>

                  <tbody>
                    <xsl:for-each select="sitemap:urlset/sitemap:url">
                      <tr>
                        <td class="url">
                          <a href="{sitemap:loc}">
                            <xsl:value-of select="sitemap:loc" />
                          </a>
                        </td>

                        <td class="date">
                          <xsl:value-of select="sitemap:lastmod" />
                        </td>

                        <td class="changefreq">
                          <xsl:value-of select="sitemap:changefreq" />
                        </td>

                        <td class="priority">
                          <xsl:value-of select="sitemap:priority" />
                        </td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </xsl:when>

              <xsl:otherwise>
                <div class="empty">
                  No sitemap entries found.
                </div>
              </xsl:otherwise>

            </xsl:choose>
          </section>

          <footer class="footer">
            XML sitemap generated by FreeCodeDocs.
          </footer>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>