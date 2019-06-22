/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ALERT_TYPES } from '../utils/alert-types';
import { ClrCommonStrings } from '../../../utils/i18n/common-strings.interface';
let AlertIconAndTypesService = class AlertIconAndTypesService {
    constructor(commonStrings) {
        this.commonStrings = commonStrings;
        this.defaultIconShape = 'info-circle';
        this._alertIconShape = '';
        this._alertType = 'info';
    }
    get alertType() {
        return this._alertType;
    }
    set alertType(val) {
        if (ALERT_TYPES.indexOf(val) > -1) {
            this._alertType = val;
        }
    }
    get alertIconShape() {
        if ('' === this._alertIconShape) {
            return this.iconInfoFromType(this._alertType).shape;
        }
        return this._alertIconShape;
    }
    set alertIconShape(val) {
        if (!val) {
            this._alertIconShape = '';
        }
        else if (val !== this._alertIconShape) {
            this._alertIconShape = val;
        }
    }
    get alertIconTitle() {
        return this.iconInfoFromType(this._alertType).title;
    }
    iconInfoFromType(type) {
        const returnObj = { shape: '', cssClass: '', title: '' };
        switch (type) {
            case 'warning':
                returnObj.shape = 'exclamation-triangle';
                returnObj.cssClass = 'alert-warning';
                returnObj.title = this.commonStrings.warning;
                break;
            case 'danger':
                returnObj.shape = 'exclamation-circle';
                returnObj.cssClass = 'alert-danger';
                returnObj.title = this.commonStrings.danger;
                break;
            case 'success':
                returnObj.shape = 'check-circle';
                returnObj.cssClass = 'alert-success';
                returnObj.title = this.commonStrings.success;
                break;
            default:
                returnObj.shape = this.defaultIconShape;
                returnObj.cssClass = 'alert-info';
                returnObj.title = this.commonStrings.info;
                break;
        }
        return returnObj;
    }
};
AlertIconAndTypesService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [ClrCommonStrings])
], AlertIconAndTypesService);
export { AlertIconAndTypesService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1hbmQtdHlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImVtcGhhc2lzL2FsZXJ0L3Byb3ZpZGVycy9pY29uLWFuZC10eXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFHaEYsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFDbkMsWUFBb0IsYUFBK0I7UUFBL0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBRTNDLHFCQUFnQixHQUFHLGFBQWEsQ0FBQztRQUNqQyxvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUNyQixlQUFVLEdBQUcsTUFBTSxDQUFDO0lBSjBCLENBQUM7SUFNdkQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxJQUFJLFNBQVMsQ0FBQyxHQUFXO1FBQ3ZCLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztTQUN2QjtJQUNILENBQUM7SUFFRCxJQUFJLGNBQWM7UUFDaEIsSUFBSSxFQUFFLEtBQUssSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUMvQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3JEO1FBQ0QsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFDRCxJQUFJLGNBQWMsQ0FBQyxHQUFXO1FBQzVCLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztTQUMzQjthQUFNLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRUQsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDdEQsQ0FBQztJQUVNLGdCQUFnQixDQUFDLElBQVk7UUFDbEMsTUFBTSxTQUFTLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBRXpELFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxTQUFTO2dCQUNaLFNBQVMsQ0FBQyxLQUFLLEdBQUcsc0JBQXNCLENBQUM7Z0JBQ3pDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsZUFBZSxDQUFDO2dCQUNyQyxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO2dCQUM3QyxNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLFNBQVMsQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUM7Z0JBQ3ZDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDO2dCQUNwQyxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO2dCQUM1QyxNQUFNO1lBQ1IsS0FBSyxTQUFTO2dCQUNaLFNBQVMsQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDO2dCQUNqQyxTQUFTLENBQUMsUUFBUSxHQUFHLGVBQWUsQ0FBQztnQkFDckMsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztnQkFDN0MsTUFBTTtZQUNSO2dCQUNFLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO2dCQUN4QyxTQUFTLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztnQkFDbEMsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztnQkFDMUMsTUFBTTtTQUNUO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztDQUNGLENBQUE7QUE5RFksd0JBQXdCO0lBRHBDLFVBQVUsRUFBRTs2Q0FFd0IsZ0JBQWdCO0dBRHhDLHdCQUF3QixDQThEcEM7U0E5RFksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFsZXJ0SW5mb09iamVjdCB9IGZyb20gJy4uL3V0aWxzL2FsZXJ0LWluZm8tb2JqZWN0JztcbmltcG9ydCB7IEFMRVJUX1RZUEVTIH0gZnJvbSAnLi4vdXRpbHMvYWxlcnQtdHlwZXMnO1xuaW1wb3J0IHsgQ2xyQ29tbW9uU3RyaW5ncyB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3MuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFsZXJ0SWNvbkFuZFR5cGVzU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tbW9uU3RyaW5nczogQ2xyQ29tbW9uU3RyaW5ncykge31cblxuICBwcml2YXRlIGRlZmF1bHRJY29uU2hhcGUgPSAnaW5mby1jaXJjbGUnO1xuICBwcml2YXRlIF9hbGVydEljb25TaGFwZSA9ICcnO1xuICBwcml2YXRlIF9hbGVydFR5cGUgPSAnaW5mbyc7XG5cbiAgZ2V0IGFsZXJ0VHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9hbGVydFR5cGU7XG4gIH1cbiAgc2V0IGFsZXJ0VHlwZSh2YWw6IHN0cmluZykge1xuICAgIGlmIChBTEVSVF9UWVBFUy5pbmRleE9mKHZhbCkgPiAtMSkge1xuICAgICAgdGhpcy5fYWxlcnRUeXBlID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGdldCBhbGVydEljb25TaGFwZSgpOiBzdHJpbmcge1xuICAgIGlmICgnJyA9PT0gdGhpcy5fYWxlcnRJY29uU2hhcGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmljb25JbmZvRnJvbVR5cGUodGhpcy5fYWxlcnRUeXBlKS5zaGFwZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2FsZXJ0SWNvblNoYXBlO1xuICB9XG4gIHNldCBhbGVydEljb25TaGFwZSh2YWw6IHN0cmluZykge1xuICAgIGlmICghdmFsKSB7XG4gICAgICB0aGlzLl9hbGVydEljb25TaGFwZSA9ICcnO1xuICAgIH0gZWxzZSBpZiAodmFsICE9PSB0aGlzLl9hbGVydEljb25TaGFwZSkge1xuICAgICAgdGhpcy5fYWxlcnRJY29uU2hhcGUgPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFsZXJ0SWNvblRpdGxlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaWNvbkluZm9Gcm9tVHlwZSh0aGlzLl9hbGVydFR5cGUpLnRpdGxlO1xuICB9XG5cbiAgcHVibGljIGljb25JbmZvRnJvbVR5cGUodHlwZTogc3RyaW5nKTogQWxlcnRJbmZvT2JqZWN0IHtcbiAgICBjb25zdCByZXR1cm5PYmogPSB7IHNoYXBlOiAnJywgY3NzQ2xhc3M6ICcnLCB0aXRsZTogJycgfTtcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnd2FybmluZyc6XG4gICAgICAgIHJldHVybk9iai5zaGFwZSA9ICdleGNsYW1hdGlvbi10cmlhbmdsZSc7XG4gICAgICAgIHJldHVybk9iai5jc3NDbGFzcyA9ICdhbGVydC13YXJuaW5nJztcbiAgICAgICAgcmV0dXJuT2JqLnRpdGxlID0gdGhpcy5jb21tb25TdHJpbmdzLndhcm5pbmc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZGFuZ2VyJzpcbiAgICAgICAgcmV0dXJuT2JqLnNoYXBlID0gJ2V4Y2xhbWF0aW9uLWNpcmNsZSc7XG4gICAgICAgIHJldHVybk9iai5jc3NDbGFzcyA9ICdhbGVydC1kYW5nZXInO1xuICAgICAgICByZXR1cm5PYmoudGl0bGUgPSB0aGlzLmNvbW1vblN0cmluZ3MuZGFuZ2VyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgICByZXR1cm5PYmouc2hhcGUgPSAnY2hlY2stY2lyY2xlJztcbiAgICAgICAgcmV0dXJuT2JqLmNzc0NsYXNzID0gJ2FsZXJ0LXN1Y2Nlc3MnO1xuICAgICAgICByZXR1cm5PYmoudGl0bGUgPSB0aGlzLmNvbW1vblN0cmluZ3Muc3VjY2VzcztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm5PYmouc2hhcGUgPSB0aGlzLmRlZmF1bHRJY29uU2hhcGU7XG4gICAgICAgIHJldHVybk9iai5jc3NDbGFzcyA9ICdhbGVydC1pbmZvJztcbiAgICAgICAgcmV0dXJuT2JqLnRpdGxlID0gdGhpcy5jb21tb25TdHJpbmdzLmluZm87XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiByZXR1cm5PYmo7XG4gIH1cbn1cbiJdfQ==