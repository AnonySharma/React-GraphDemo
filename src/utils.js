export const numFormatter = (num) => {
	if (num >= 10000000) {
		return Math.round(num / 10000000) + " Crore";
	} else if (num >= 100000) {
		return Math.round(num / 100000) + " Lakh";
	} else if (num >= 1000) {
		return Math.round(num / 1000) + " Thousand";
	} else {
		return Math.round(num);
	}
};

export const getColorAndStatus = (percentage) => {
	if (percentage > 66) {
		return {
			primary: "#5ECE84",
			secondary: "#FAECDC",
			status: "On Track",
		};
	} else if (percentage > 33) {
		return {
			primary: "#FBB24D",
			secondary: "#F7EBD8",
			status: "Off Track",
		};
	} else {
		return {
			primary: "#F24426",
			secondary: "#F9D2D1",
			status: "At Risk",
		};
	}
};
