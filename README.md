# Landing Page — Terapia Quântica e Espiritual

Site estático de página única (HTML + CSS + JavaScript puro, sem build e sem dependências). Basta enviar os arquivos para qualquer hospedagem.

## Estrutura

```
.
├── index.html            # Página principal (SEO, dados estruturados, conteúdo)
├── 404.html              # Página de erro "não encontrada"
├── robots.txt            # Regras para robôs de busca + endereço do sitemap
├── sitemap.xml           # Mapa do site para Google/Bing
├── site.webmanifest      # Metadados para "adicionar à tela inicial" no celular
├── .htaccess             # HTTPS, www, compressão, cache e segurança (Apache)
└── assets/
    ├── css/style.css     # Estilos — variáveis de tema no topo do arquivo
    ├── js/main.js        # Menu mobile, animações, ano do rodapé, rastreamento
    └── img/
        ├── favicon.svg / favicon-32.png / apple-touch-icon.png
        ├── icon-192.png / icon-512.png   # ícones do manifest
        └── og-image.jpg                  # imagem 1200×630 exibida ao compartilhar o link
```

## Checklist antes de publicar

Busque por `EDITAR` e `seudominio.com.br` em todos os arquivos. Itens a trocar:

| O quê | Onde |
|---|---|
| Nome do negócio (`Luz Interior Terapias`) | `index.html` (title, meta, JSON-LD, header, rodapé), `404.html`, `site.webmanifest`, `og-image.jpg` |
| Domínio (`https://www.seudominio.com.br`) | `index.html` (canonical, og:url, og:image, JSON-LD), `robots.txt`, `sitemap.xml` |
| WhatsApp (`5511900000000`) | `index.html` — botão de contato e botão flutuante (formato: 55 + DDD + número, só dígitos). Telefone também no JSON-LD |
| E-mail (`contato@seudominio.com.br`) | `index.html` — botão de contato e JSON-LD |
| Redes sociais (`seuperfil`) | `index.html` — seção de contato e `sameAs` no JSON-LD. Remova o `<li>` das redes que não usar |
| Cidade / UF | `index.html` — `<title>`, seção de contato e `address` no JSON-LD |
| Data em `<lastmod>` | `sitemap.xml` — atualize sempre que alterar o conteúdo |

A `og-image.jpg` pode ser recriada no Canva (1200×630 px) com o nome e a identidade visual definitivos.

## Cores e fontes

Tudo fica nas variáveis do bloco `:root` no início de `assets/css/style.css` (`--c-night`, `--c-gold` etc.). Mudar ali altera o site inteiro.

## Publicação

1. Envie **todo o conteúdo** desta pasta (incluindo o `.htaccess`, que é oculto) para a pasta pública da hospedagem, normalmente `public_html/`.
2. Ative o certificado SSL (HTTPS) no painel — a maioria das hospedagens oferece Let's Encrypt gratuito.
3. O `.htaccess` força `https://www.`. Se preferir o domínio **sem www**, troque o bloco de redirecionamento por:

   ```apache
   RewriteCond %{HTTPS} off [OR]
   RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
   RewriteCond %{HTTP_HOST} ^(?:www\.)?(.+)$ [NC]
   RewriteRule ^ https://%1%{REQUEST_URI} [L,R=301]
   ```

   e ajuste as URLs do `index.html`, `robots.txt` e `sitemap.xml` para ficarem consistentes.

**Nginx** (VPS) — equivalente mínimo:

```nginx
server {
    listen 443 ssl http2;
    server_name www.seudominio.com.br;
    root /var/www/terapia;
    index index.html;
    error_page 404 /404.html;

    gzip on;
    gzip_types text/css application/javascript image/svg+xml application/manifest+json;

    location ~* \.(css|js|svg|png|jpg|jpeg|webp)$ {
        expires 30d;
        add_header Cache-Control "public";
    }
}
```

Alternativas gratuitas para site estático: Netlify, Vercel, Cloudflare Pages ou GitHub Pages (nesses, o `.htaccess` é ignorado; HTTPS e compressão já vêm prontos).

Para testar localmente: `python -m http.server 8000` na pasta e abrir `http://localhost:8000`.

## SEO — o que já está implementado

- HTML semântico (`header`, `nav`, `main`, `section`, `article`, `footer`), um único `<h1>` e hierarquia de títulos correta.
- `title`, `meta description`, `canonical` e `robots`.
- Open Graph e Twitter Card para prévia bonita no WhatsApp, Instagram, Facebook e LinkedIn.
- Dados estruturados Schema.org (`HealthAndBeautyBusiness` com catálogo de serviços, e `FAQPage`).
- `robots.txt` e `sitemap.xml`.
- Performance: sem frameworks, JS com `defer`, ícones em SVG inline, fontes com `preconnect` + `display=swap`, compressão e cache via `.htaccess`.
- Acessibilidade: link "pular para o conteúdo", foco visível, `aria-*` no menu, respeito a `prefers-reduced-motion`. O site funciona sem JavaScript.

## Depois de publicar

1. **Google Search Console** — cadastre o domínio e envie `https://www.seudominio.com.br/sitemap.xml`.
2. **Google Perfil da Empresa** (antigo Google Meu Negócio) — essencial para aparecer em buscas locais como "reiki em [cidade]". Use o mesmo nome, telefone e endereço do site.
3. **Bing Webmaster Tools** — pode importar direto do Search Console.
4. Valide os dados estruturados em <https://search.google.com/test/rich-results> e a velocidade em <https://pagespeed.web.dev>.
5. Teste a prévia de compartilhamento em <https://developers.facebook.com/tools/debug/>.

## Tráfego pago e rastreamento

No `<head>` do `index.html` há um bloco comentado para **Google Analytics 4** e **Meta Pixel**. Ao ativá-los, o `main.js` passa a enviar automaticamente um evento a cada clique em links com `data-track` (WhatsApp, e-mail, redes sociais):

- GA4: evento `contato_click` com o parâmetro `canal` — marque-o como conversão.
- Meta Pixel: evento padrão `Contact`.

Com rastreamento ativo, a LGPD exige aviso de cookies e uma política de privacidade.

**Anúncios de terapias:** as políticas do Google Ads e da Meta restringem promessas de cura e alegações de saúde. O texto do site foi escrito evitando promessas de resultado e inclui o aviso de que as terapias são complementares. Mantenha esse cuidado nos textos dos anúncios para evitar reprovações.

## Próximos passos sugeridos

- Seção "Sobre mim" com foto e formação do(a) terapeuta — aumenta confiança e conversão.
- Depoimentos reais de clientes (com autorização).
- Blog com artigos ("o que é Reiki", "benefícios da auriculoterapia") para ganhar tráfego orgânico com palavras-chave de cauda longa.
- Converter a `og-image` e futuras fotos para WebP.
