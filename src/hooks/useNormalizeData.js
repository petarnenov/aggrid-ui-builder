import { useEffect, useMemo, useState } from "react"

const useNormalizeData = (data) => {
	const [ids, setIds] = useState([]);
	const [items, setItems] = useState({});

	useEffect(() => {
		if (!data || !Array.isArray(data)) {
			return;
		}

		setIds(data.map(item => item.id));
		setItems(data.reduce((acc, item) => {
			acc[item.id] = item;
			return acc;
		}, {}));

	}, [data]);

	const normalizeData = useMemo(() => ({ ids, items }), [ids, items]);

	return normalizeData;
};

export default useNormalizeData;
