import { InjectionToken } from "@angular/core";
import { AdminFormResponse } from "@modules/admin/interfaces/admin-form-response.interface";

export const ADMIN_RESPONSE_TOKEN = new InjectionToken<AdminFormResponse>('ADMIN_RESPONSE_TOKEN');