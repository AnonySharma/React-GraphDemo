import data from "./data.json";

const fetchData = () => {
	const graph = JSON.parse(JSON.stringify(data));
	return graph;
};

export default fetchData;
