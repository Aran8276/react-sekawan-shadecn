export interface Theme {
  theme: ThemeObject;
}

export interface ThemeObject {
  theme: string;
}

export default function Homepage() {
  return (
    <>
      <div className="">Hello World! (This is a homepage)</div>
    </>
  );
}
