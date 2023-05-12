import { createMask } from '@ngneat/input-mask';

export type InputMaskType = 'post-code';

export const POSTCODE_MASK = createMask({
	mask: '99-999',
	autoUnmask: true,
	jitMasking: true
});