"use client";
import { CategoryProductCount, RenderActiveShapeProps } from "@/types/chartData";
import { PureComponent } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Legend } from "recharts";




const renderActiveShape = (props: unknown) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props as RenderActiveShapeProps;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill="var(--color-Text)">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="var(--color-Text)"
      >{`Count ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="var(--color-Text)"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


interface ExampleState {
  activeIndex: number;
}
interface ChartPieProps {
  productsByCategory: CategoryProductCount[];
}
export default class Example extends PureComponent<ChartPieProps, ExampleState> {
  state: ExampleState = {
    activeIndex: 0,
  };

  onPieEnter = (_: unknown, index: number) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
        <ResponsiveContainer width="100%" minHeight={400}  >
        <PieChart width={800} height={800}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={this.props.productsByCategory}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={110}
            fill="var(--color-Chart-Primary)"
            dataKey="value"
            onMouseEnter={this.onPieEnter}
          />
          <Legend/>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
