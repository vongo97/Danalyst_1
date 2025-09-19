import * as React from "react"

// Importamos la función cn. Esta función generalmente se encuentra en src/lib/utils.ts
// Si no tienes este archivo, necesitarás crearlo (ver siguiente Canvas).
import { cn } from "@/lib/utils"

// Define las propiedades del Separator
interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical" // Orientación del separador
  decorative?: boolean // Indica si es solo decorativo para accesibilidad
}

// Componente Separator
const Separator = React.forwardRef<
  HTMLDivElement,
  SeparatorProps
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    // Renderiza un div con estilos de separador
    <div
      ref={ref}
      role={decorative ? "none" : undefined} // Rol para accesibilidad
      // Clases de Tailwind CSS para estilo:
      // shrink-0: Evita que se encoja
      // bg-border: Color de fondo (asume una variable CSS --border definida en globals.css o theme)
      // h-[1px] w-full: Para separador horizontal (altura 1px, ancho completo)
      // w-[1px] h-full: Para separador vertical (ancho 1px, altura completa)
      // Las clases se combinan usando la función cn
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className // Permite clases adicionales pasadas como prop
      )}
      {...props}
    />
  )
)
Separator.displayName = "Separator" // Nombre para depuración

export { Separator } // Exporta el componente
