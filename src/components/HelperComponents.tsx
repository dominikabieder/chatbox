import React from 'react'
import { Card, CircularProgress, Typography as T } from "@mui/material";

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Card sx={{ p: 1.5 }}>
    <T variant='h6'>Hallo! Hier ist der Botty π€</T>
    <T variant='h6' gutterBottom>Bitte beantworten Sie die folgende Fragen β¬οΈ</T>
    {children}
  </Card>
)

export const BottySays = () => <T variant='overline'> π€ Botty:</T>

export const HumanSays = () => <T variant='overline'> π©πΌ Sie:</T>

export const Loader = () => (
  <section role='status' aria-label='Fragen werden geladen...'>
    <CircularProgress />
  </section>
);

export const Error = () => (
  <>
    <BottySays />
    <section role='status' aria-label='Fehler'>
      <T>β Fehler</T>
    </section>
  </>
);

export const Success = () => (
  <>
    <BottySays />
    <section role='status' aria-label='Erfolg'>
      <T>π Herzlichen Dank fΓΌr Ihre Angaben!</T>
    </section>
  </>
);
