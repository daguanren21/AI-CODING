## ADDED Requirements

### Requirement: Buyer Dashboard Card Shell
Buyer Center 浠〃鐩樹笅鎵€鏈夊姛鑳芥ā鍧?MUST 浣跨敤缁熶竴 Card 缁勪欢锛氳儗鏅?#fff銆乸adding 16px 8px銆佸渾瑙?0銆佹爣棰樹笌鍙充笂鎿嶄綔鏍忓崰棣栬銆?
#### Scenario: Render tip tooltip when tip content provided
- **GIVEN** 鍔熻兘閰嶇疆鍖呭惈 `tip` 鏂囨
- **WHEN** Card 娓叉煋鏍囬鍖哄煙
- **THEN** 宸︿晶鏍囬鏃佸睍绀轰竴涓?tip 鍥炬爣锛屽苟浣跨敤 Element Plus `el-tooltip` 鏄剧ず `tip` 鍐呭

#### Scenario: Hide link icon and description when props missing
- **GIVEN** 鍔熻兘鏈彁渚?`linkUrl` 鎴?`message`
- **THEN** 鍙充晶璺宠浆鍥炬爣鍜屾弿杩版枃妗堥兘涓嶆覆鏌?
#### Scenario: Display empty state when module has no data
- **WHEN** slots 鍐呭涓虹┖鎴栨湇鍔¤繑鍥?`data: []`
- **THEN** Card 鍐呭鍖哄煙灞曠ず 鈥滄殏鏃犳暟鎹€?鏂囨 + 绌烘€佸浘鏍囷紝骞朵笌鏍囬鍖轰繚鎸?`margin-top: 12px`

### Requirement: Buyer Dashboard Layout Columns
寰呭姙鎬昏涓嬬殑 Buyer Dashboard 鍖哄煙 MUST 鍥哄畾楂樺害 860px锛岄噰鐢ㄤ笁鏍忓竷灞€锛堝乏/涓?鍙筹級锛屽垪涓庡垪涔嬮棿 gap 16px锛屽垪鍐呭崱鐗囦笂涓?gap 16px锛屽叏閮ㄥ崱鐗囬珮搴︿竴鑷淬€?
#### Scenario: Align platform notice height to help desk card
- **GIVEN** 骞冲彴灏忕涔︼紙宸﹀垪绗竴涓級鐪熷疄娓叉煋楂樺害
- **WHEN** 娓叉煋骞冲彴鍏憡 Card
- **THEN** 鍏憡鍗＄墖楂樺害 = 灏忕涔﹂珮搴︼紝涓斿叕鍛婂垪琛ㄦ潯鏁版牴鎹珮搴﹁嚜鍔ㄨ鍓紙鍗曟潯 52px锛屾渶澶?7 鏉★級

#### Scenario: Respect max rows per module
- **GIVEN** 骞冲彴灏忕涔︽瘡椤归珮搴?80px銆佹渶澶?4 鏉?- **THEN** 褰撴湇鍔¤繑鍥炶秴杩?4 鏉℃椂锛屼粎娓叉煋鍓?4 鏉★紝鍏朵綑閫氳繃鈥滄煡鐪嬫洿澶氣€濆叆鍙ｆ垨鍒嗛〉澶勭悊

### Requirement: Buyer Dashboard Data Contracts
鏈嶅姟绔?Mock 鎺ュ彛 MUST 绗﹀悎缁熶竴缁撴瀯锛?```
interface ServiceStructure {
  code: number;
  data: {
    common: { linkUrl: string };
    data: Record<string, any>;
  };
  message: string;
}
```
骞?MUST 鎻愪緵浠ヤ笅鏋氫妇涓庣被鍨嬶細`IsReply`, `IsRead`, `MakeSureStatus`, `IPlatformHelpDesk`, `IPlatformSystemNotice`, `IInventoryAgeHorizontal`, `IInventoryAgeVertical`, `IInventoryAge`銆?
#### Scenario: Control link icon via common.linkUrl
- **WHEN** `data.common.linkUrl` 涓虹┖瀛楃涓叉垨 `null`
- **THEN** Card 鍙充笂璺宠浆鍥炬爣涓嶆樉绀?- **ELSE** 鐐瑰嚮鍥炬爣鍦ㄦ柊绐楀彛鎵撳紑 `linkUrl`

#### Scenario: Honor enum semantics
- `IsReply = 1` 琛ㄧず闇€鍥炲锛孋ard 闇€瑙嗚寮鸿皟
- `IsRead = 0` 琛ㄧず鏈锛屾爣棰樺乏渚у睍绀烘湭璇诲皬鍦嗙偣
- `MakeSureStatus = '1'` 琛ㄧず鍏憡宸茬‘璁わ紝闇€鍦ㄨ鍐呮樉绀衡€滃凡纭鈥濇爣绛?
### Requirement: Buyer Dashboard Inventory Age Visualization
瀹炴椂搴撻緞鍒嗗竷妯″潡 MUST 浣跨敤妯悜鏌辩姸鍥惧睍绀?`IInventoryAge` 鏁版嵁锛歒 杞翠袱琛岋紙`day_desc`/`storage_fee_desc`锛夛紝X 杞翠互 `horizontal_segments` 灏?`max_qty` 鍧囧垎涓?N 娈碉紝鏌变綋椤堕儴鏄剧ず鏁伴噺涓庡崰姣斻€?
#### Scenario: Render axis labels per `IInventoryAgeVertical`
- **WHEN** `vertical` 鏁扮粍鎻愪緵 `day_desc` 涓?`storage_fee_desc`
- **THEN** 姣忎釜 Y 杞存爣绛剧涓€琛屽睍绀?`day_desc`锛岀浜岃灞曠ず `storage_fee_desc`

#### Scenario: Segment X axis automatically
- **GIVEN** `horizontal_segments = 5` 涓?`max_qty = 10000`
- **THEN** X 杞?MUST 灞曠ず 6 涓埢搴︼紙0銆?000銆?000銆?000銆?000銆?0000锛夛紝骞舵寜鐩稿悓鍖洪棿瀹藉害缁樺埗鏌变綋

#### Scenario: Color bars based on style
- **GIVEN** `horizontal[i].style = 'highlight'`
- **THEN** 瀵瑰簲鏌变綋濉厖鑹?= #FF8B38锛沗'warning'` -> #FFA238锛涘叾浣?-> #75A0F4

#### Scenario: Show qty and proportion on bar top
- **WHEN** `horizontal[i]` 鎻愪緵 `qty` 鍜?`proportion`
- **THEN** 鏌变綋椤堕儴绗竴琛屾樉绀?`qty` 鏁板瓧锛岀浜岃鏄剧ず `proportion`锛堢櫨鍒嗘瘮锛?
### Requirement: Buyer Dashboard Carousel Modules
banner銆佸簵閾鸿繑鐐瑰悎绾﹀箍鍦恒€佸仛浠诲姟棰嗕簯浠撹眴绛夋ā鍧?MUST 閲囩敤鍗曟潯鏁版嵁=涓€椤电殑杞挱琛屼负锛屼笌鈥滆繎涓冨ぉ鍒版湡鈥濇ā鍧椾氦浜掍竴鑷淬€?
#### Scenario: Advance carousel per record
- **GIVEN** 妯″潡鏁版嵁鏁扮粍闀垮害 N
- **THEN** 杞挱鎬婚〉鏁?= N锛屾瘡娆″垏鎹㈠睍绀轰竴鏉¤褰曪紱褰?N <= 1 鏃堕殣钘忔寚绀哄櫒

#### Scenario: Fallback image handling
- **WHEN** banner 鏁版嵁缂哄け鍥剧墖 URL
- **THEN** 浣跨敤榛樿鍗犱綅鍥撅紝骞跺湪鏃ュ織涓褰曠己澶卞瓧娈碉紝浠嶄繚鎸佸崱鐗囬珮搴?

