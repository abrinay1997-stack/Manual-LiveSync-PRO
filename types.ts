export interface ManualSubsection {
  title: string;
  content: string[];
}

export interface ManualSection {
  /** Id estable: se usa como ancla en la URL (#id) y para el progreso guardado. */
  id: string;
  title: string;
  icon?: string;
  content: string[];
  subsections?: ManualSubsection[];
}

export interface ManualPart {
  id: string;
  /** Orden de la parte dentro del manual (1, 2, 3…). */
  number: number;
  /** Etiqueta visible en la navegación, p. ej. "PARTE 1" o "ANEXO". */
  label: string;
  title: string;
  sections: ManualSection[];
}
