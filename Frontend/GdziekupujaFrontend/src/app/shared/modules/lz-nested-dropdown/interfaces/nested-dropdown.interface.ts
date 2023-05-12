export interface NestedDropdown<T> {
  name: DropDownText;
  data?: T,
  children?: NestedDropdown<T>[];
}

export type DropDownText = 'Oferta' | 'Produkt' | 'Kategoria' | 'Punkt sprzedaży' | 'Użytkownik' | 'Instancja produktu';