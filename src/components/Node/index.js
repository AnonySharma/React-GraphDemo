import React from "react";
import "./style.css";

import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import { Card, Grid } from "@mui/material";
import { CSSTransition } from "react-transition-group";

import { numFormatter, getColorAndStatus } from "../../utils";

const getWindowDimensions = () => {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
};

class Node extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			children: [],
			showChildren: false,
		};
		this.toggleChildren = this.toggleChildren.bind(this);
		this.deleteNode = this.deleteNode.bind(this);
	}

	componentDidMount() {
		this.setState({
			children: this.props.children,
		});
	}

	toggleChildren() {
		this.setState({
			showChildren: !this.state.showChildren,
		});
	}

	deleteNode(index) {
		this.setState({
			children: this.state.children.filter((child, i) => i !== index),
		});
	}

	render() {
		const { width } = getWindowDimensions();
		const { name, total, target, deleteNode } = this.props;
		const { children, showChildren } = this.state;
		const offset = this.props.offset || 20;
		const offsetLeft = this.props.offsetLeft || (width - 350) / 2;
		const _total = numFormatter(total);
		const _target = numFormatter(target);
		const percentage = Math.round((total / target) * 100);
		const color = getColorAndStatus(percentage);

		return (
			<>
				<div style={{ position: "absolute", top: `${offset}px`, left: `${offsetLeft}px` }}>
					<Card
						sx={{ padding: "20px", width: "350px", cursor: "pointer" }}
						onClick={this.toggleChildren}
						onContextMenu={(e) => {
							e.preventDefault();
							deleteNode();
						}}
					>
						<Grid container>
							<Grid item xs={8}>
								<b style={{ fontWeight: 500 }}>
									<span>{name}</span>
								</b>
							</Grid>
							<Grid item xs={4}>
								<b style={{ fontWeight: 900 }}>
									<span>{percentage + "% "}</span>
								</b>
								<span>complete</span>
							</Grid>
							<Grid item xs={12}>
								<div style={{ height: "40px" }}></div>
							</Grid>
							<Grid item xs={8}>
								<Grid item xs={12}>
									<b>
										<span>{"Total Sales - " + _total}</span>
									</b>
								</Grid>
								<Grid item xs={12}>
									<b>
										<span>{"Target Sales - " + _target}</span>
									</b>
								</Grid>
							</Grid>
							<Grid item xs={4}>
								<div
									style={{
										color: color.primary,
										backgroundColor: color.secondary,
										padding: "5px",
										textAlign: "center",
										borderRadius: "5px",
									}}
								>
									<b>{color.status}</b>
								</div>
							</Grid>
							<Grid item xs={12} sx={{ marginTop: "10px", color: color.primary }}>
								<LinearProgress
									variant="determinate"
									value={percentage}
									color="inherit"
									sx={{
										height: 15,
										borderRadius: 10,
										// [`&.${linearProgressClasses.bar}`]: {
										// 	color: color.primary,
										// },
										[`&.${linearProgressClasses.colorPrimary}`]: {
											backgroundColor: color.secondary,
										},
									}}
								/>
							</Grid>
						</Grid>
					</Card>
				</div>
				<CSSTransition in={showChildren} timeout={200} classNames="new-nodes" unmountOnExit>
					<div>
						{showChildren &&
							children &&
							children.map((child, index) => {
								return (
									<Node
										key={index}
										offset={offset + 200}
										offsetLeft={offsetLeft - (400 * children.length) / 2 + 400 * index + 400 / 2}
										name={child.name}
										total={child.total}
										target={child.target}
										children={child.children}
										deleteNode={() => this.deleteNode(index)}
									/>
								);
							})}
					</div>
				</CSSTransition>
			</>
		);
	}
}

export default Node;
