import React from "react";
import Node from "../Node";
import fetchData from "../../api/data";
import { Fab } from "@mui/material";
import { Refresh } from "@mui/icons-material";

class Graph extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			root: null,
		};
	}

	componentDidMount() {
		const root = this.refreshList();
		console.log("Fetched root from JSON!");
		console.log(root);
	}

	refreshList = () => {
		const root = fetchData();
		this.setState({
			root,
			junkKey: Math.random().toString(),
		});
		return root;
	};

	render() {
		const { root, junkKey } = this.state;
		return (
			<div>
				{root && (
					<Node
						key={junkKey}
						index={0}
						name={root.name}
						total={root.total}
						target={root.target}
						children={root.children}
					/>
				)}
				<Fab
					color="primary"
					// variant="extended"
					// size="small"
					style={{
						position: "fixed",
						bottom: "20px",
						right: "20px",
					}}
					onClick={this.refreshList}
				>
					<Refresh />
				</Fab>
			</div>
		);
	}
}

export default Graph;
