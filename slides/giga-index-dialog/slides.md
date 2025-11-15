---

# Index Dialog锛圕odex 鐢熸垚瀹炶返锛?
---

## 璁▼

- 鑳屾櫙涓庣洰鏍?- Monorepo 缁撴瀯锛圴itePress + Slidev锛?- 鐢熸垚娴佺▼涓庢彁绀鸿瘝绛栫暐
- Demo锛堟枃妗ｇ珯 + 骞荤伅锛?- 澶嶇洏涓庣粡楠?- Q&A

---

## 鑳屾櫙涓庣洰鏍?
- 闈㈠悜鍥㈤槦鍐呴儴鐨勫垎浜潗鏂欙細灏嗏€滅敓鎴愯繃绋嬩笌鏂规鈥濇矇娣€涓轰竴浣撳寲浣撶郴
- 浠ヤ腑鏂囦负涓伙紝鍙殢鏃舵墿灞曡嫳鏂囩増

---

## Monorepo 缁撴瀯

- packages/docs 鈫?杩愯 VitePress 鎸囧悜 docs/
- packages/slides 鈫?杩愯 Slidev 鎸囧悜 slides/giga-index-dialog/
- Turbo 缁熶竴缂栨帓 dev/build/export

---

## 鐢熸垚娴佺▼锛堟憳瑕侊級

- 鎻愮ず璇嶅熀绾?鈫?绾︽潫涓庤鑼?鈫?浠ｇ爜鐢熸垚 鈫?鏍￠獙涓庢敼杩?鈫?鍥炲綊涓庡鐩?- 璐ㄩ噺闂細lint/typecheck/test/build锛屽強 UI 瀵规瘮锛堝闇€锛?
---

## Demo 鎻愮ず

- 鎵撳紑涓や釜缁堢锛歚pnpm dev:docs` 涓?`pnpm dev:slides`
- 淇敼璁″垝鏂囨。涓庡够鐏墖锛屽疄鏃堕瑙?
---

## 澶嶇洏

- 甯歌鍧戜笌瀵圭瓥锛堜緷璧栥€佽矾寰勩€佷富棰樸€佸鍑猴級
- 鍚庣画璁″垝锛圕I/CD銆佷富棰樿鑼冿級

<!-- injected:giga-index-dialog:1 -->
---

## 鐩爣锛堟潵鑷鍒掞級

- 涓ユ牸澶嶅埢 Figma 鎻愪緵鐨?Index 瀵硅瘽妗嗭紙鑺傜偣 2083:44844/44845/44856/44859/44982 鍙婂叾涓嬪睘 2083:44886-44895銆?580:39853銆?568:38148/37023/37028/37030/37031 绛夛級锛岃 Buyer Center 涓殑 Giga 鎸囨爣闆疯揪銆佺淮搴﹀垪琛ㄤ笌 Suggestions 鍖哄煙鍦ㄨ鍥俱€佷氦浜掋€丮ock 鏁版嵁銆丼tore 鐘舵€佷笌娴嬭瘯涓叏閮ㄥ榻愩€?
---

## 鏋舵瀯瑕佺偣锛堟憳瑕侊級

- 鍦?pps/web/src/components/buyer-center/modules 鍐呬互 Element Plus ElDialog 鏋勫缓 Vue 3 缁勪欢锛屽唴閮ㄥ祵鍏?ECharts 闆疯揪鍥俱€佺淮搴﹀垪琛ㄣ€佸缓璁垪琛ㄣ€傛墍鏈夋暟鎹潵鑷?Pinia uyerCenterStore锛坢ock 鏁版嵁鐢?ServiceStructure 鍖呰９锛夛紝骞堕€氳繃 BuyerDashboardShell 鐨?CTA 鎵撳紑銆傛牱寮忎娇鐢?UnoCSS + buyer-center tokens + scoped CSS锛涢渶瑕佸湪 CSS 涓姞鍏ラ」鐩粺涓€鐨?box-sizing 绾︽潫銆?
---

## 鎶€鏈爤锛堟憳瑕侊級

- Vue 3 `<script setup>` + TypeScript銆丒lement Plus銆丒Charts銆丳inia銆乂itest + Vue Testing Library銆乁noCSS銆佽嚜瀹氫箟 buyer tokens銆?
---

## 浠诲姟鎬昏

- 璁捐璧版煡涓庣礌鏉愰噰闆?- 绫诲瀷涓?Mock 鏁版嵁鎵╁睍
- Pinia Store 鎵╁睍
- Index Dialog 缁勪欢
- Buyer Dashboard Shell 闆嗘垚
- 鏂囨。涓庨獙璇?- 鍏宠仈妯″潡寰皟

---

## 濡備綍鏈湴杩愯

- 瀹夎渚濊禆锛歚pnpm -C packages/docs i`锛宍pnpm -C packages/slides i`
- 寮€鍙戯細`pnpm dev:docs` 涓?`pnpm dev:slides`锛堜袱涓粓绔級
- 鏋勫缓/瀵煎嚭锛歚pnpm build:docs`锛沗pnpm build:slides` 鎴?`pnpm export:slides:pdf|png`

---

## 閮ㄧ讲锛圙itHub Pages锛?
- 鏈粨搴撳寘鍚?workflow锛?github/workflows/pages-mono.yml
- 绔欑偣鏍逛笅锛?docs锛堟枃妗ｏ級銆?slides锛堝够鐏級



---

## 浠庢ā鏉垮垱寤烘柊婕旂ず

- 鍙傝€冩枃妗ｇ珯妯℃澘锛?AI-CODING/docs/templates/slidev/template.zh.html
<!-- template-ref:slidev -->
