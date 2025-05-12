import { Children, PropsWithChildren } from 'react';

function ChartContainer({ children }: PropsWithChildren<object>) {
  return (
    <div className="w-full flex flex-col md:flex-row justify-evenly my-10 ">
      {Children.map(children, child => (
        <div className="md:w-5/12  bg-white border-2 border-Chart-Primary rounded-xl">
          {child}
        </div>
      ))}
    </div>
  );
}

export default ChartContainer;