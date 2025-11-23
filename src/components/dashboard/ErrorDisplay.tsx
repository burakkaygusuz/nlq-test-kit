import type { ValidationError } from '@/types';
import { Card, CardBody } from '@heroui/react';
import { motion, type Variants } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface ErrorDisplayProps {
  errors: ValidationError[];
}

const containerVariants: Variants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 }
};

export function ErrorDisplay({ errors }: Readonly<ErrorDisplayProps>) {
  if (errors.length === 0) return null;

  return (
    <motion.div variants={containerVariants} initial="initial" animate="animate" exit="exit">
      {errors.map((error) => (
        <Card key={error.id} className="mb-4 rounded-2xl border border-red-900/50 bg-red-950/30">
          <CardBody className="flex flex-row items-center gap-3 px-5 py-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
            <span className="font-medium text-red-200">{error.message}</span>
          </CardBody>
        </Card>
      ))}
    </motion.div>
  );
}
