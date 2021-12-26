import React from "react";
import Node from "../Node";
import fetchData from "../../api/data";

class Graph extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
		};
	}

	componentDidMount() {
		const data = fetchData();
		this.setState({
			data,
		});
		console.log(data);
	}

	render() {
		const { data } = this.state;
		return (
			<div>
				{data && (
					<Node key={data.name} name={data.name} total={data.total} target={data.target} children={data.children} />
				)}
			</div>
		);
	}
}

export default Graph;
