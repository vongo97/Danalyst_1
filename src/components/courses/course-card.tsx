import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock } from 'lucide-react';
import { Course } from '@/data/courses'; // Importamos el tipo desde nuestro archivo

interface CourseCardProps {
  course: Course; // Usa la interfaz Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Sección de la imagen */}
      {course.url_imagen ? (
        <div className="relative w-full h-48"> {/* Contenedor padre con position: relative y dimensiones */}
          <Image
            src={course.url_imagen}
            alt={`Imagen del curso ${course.titulo}`}
            fill={true} // Usando fill
            className="object-cover" // Usando className para object-fit
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 25vw"
          />
        </div>
      ) : (
        // Si no hay url_imagen, mostramos un mensaje o un placeholder
        <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
          No Image Available
        </div>
      )}

      {/* Encabezado de la tarjeta */}
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          {course.categoria_id && (<Badge variant="secondary">Categoría {course.categoria_id}</Badge>)}
          {course.nivel && (<Badge variant="outline">{course.nivel}</Badge>)}
        </div>
        <CardTitle className="text-xl font-semibold">{course.titulo}</CardTitle>
      </CardHeader>

      {/* Contenido de la tarjeta (descripcion y duracion) */}
      <CardContent className="flex-grow">
        <CardDescription>{course.descripcion}</CardDescription>

        {course.duracion && (
          <div className="mt-3 flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1.5 h-4 w-4" />
            <span>{course.duracion}</span>
          </div>
        )}
      </CardContent>

      {/* Pie de pagina de la tarjeta (boton "Aprender Mas") */}
      <CardFooter>
        <Link href={course.enlace || '#'} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            Aprender Más
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
