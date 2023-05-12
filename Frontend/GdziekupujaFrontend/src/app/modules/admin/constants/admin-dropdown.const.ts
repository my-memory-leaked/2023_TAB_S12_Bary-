import { CategoryComponent } from "@modules/admin/pages/category/category.component";
import { AdminDropdownData } from "@modules/admin/interfaces/admin-dropdown.interface";
import { CategoryService } from "@modules/admin/pages/category/services/category.service";
import { SalesPointComponent } from "@modules/admin/pages/sales-point/sales-point.component";
import { SalesPointService } from "@modules/admin/pages/sales-point/services/sales-point.service";
import { NestedDropdown } from "@shared/modules/lz-nested-dropdown/interfaces/nested-dropdown.interface";
import { ProductComponent } from "../pages/product/product.component";
import { ProductService } from "../pages/product/services/product.service";
import { ProductInstanceComponent } from "../pages/product-instance/product-instance.component";
import { ProductInstanceService } from "../pages/product-instance/services/product-instance.service";

export const AdminDropDown: NestedDropdown<AdminDropdownData>[] =
  [
    {
      name: 'Kategoria',
      data: {
        formComponent: CategoryComponent,
        formProvider: CategoryService,
      },
    },
    {
      name: 'Punkt sprzedaży',
      data: {
        formComponent: SalesPointComponent,
        formProvider: SalesPointService,
      },
    },
    {
      name: 'Produkt',
      data: {
        formComponent: ProductComponent,
        formProvider: ProductService,
      },
    },
    // {
    //   name: 'Oferta',
    //   data: {
    //     formComponent: OfferComponent,
    //     formProvider: OfferService,
    //   },
    // },
    // {
    //   name: 'Użytkownik',
    //   data: {
    //     formComponent: UserComponent,
    //     formProvider: UserService,
    //   },
    // },
    {
      name: 'Instancja produktu',
      data: {
        formComponent: ProductInstanceComponent,
        formProvider: ProductInstanceService,
      },
    },
  ];