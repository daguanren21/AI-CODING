## Why

- ���д�������δ���� Figma 463-28491 ���ҳ�棺ȱ����ʵ SVG icon�������Ű桢���䱳���� hover ��Ӱ
- ģ�����/�߶�δ�� BaseInfo һ�£�1600px/1200px ��Լ��ʧЧ��ҳ����ָ��Ѹ�
- �������쵽�ڡ� δ�� Figma ʹ�� Swiper �Զ��ֲ����Զ���ָʾ����Ҳȱ�� hover ��ͣ/�ָ�������ʱ pill ��ʽ
- Mock ������Ϊռλ���������Ӿ��뽻�������޷�����

## What Changes

- �� `theme/colors.ts` �� `uno.config.ts` ��չ token �� shortcuts�����Ǳ������塢���䡢pill��ָʾ����hover ��Ӱ
- �ع� `TodoOverview.vue`��`TodoCardGrid.vue`��`TodoCard.vue`��Ӧ�� 5 �п�Ƭ��̧�� hover����ʵ SVG icon �������İ�
- ʹ�� Swiper ��д `DueSoonPanel.vue`��`DueSoonItem.vue` ������ `useTodoCarousel.ts`��ʵ�� 3 ��/���ֲ�����������ͣ��ָʾ��Բ�㡢����ʱ pill
- ���� `todoOverviewData.ts` mock ���ݣ����� ID/����ʱ copy������ Vitest ���ǣ�TodoOverview��DueSoonPanel��useTodoCarousel��
- ͬ�� `specs/ui-main-content/spec.md`/`tasks.md` ˵�� hover ���䡢���塢ָʾ����Ϊ

## Impact

- ��Ҫ `swiper` ����ʱ�������Ѵ��ڣ������� UnoCSS ��������������������
- �޸Ķ�� Vue ��� + composable + ���ԣ�������ִ�� `pnpm --filter @custom/web test:run --coverage` �� `pnpm --filter @custom/web dev`
- ���� UI/����һ���Բ����� 100% ������Ҫ��
