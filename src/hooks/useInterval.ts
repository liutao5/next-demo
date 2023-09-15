import { useEffect, useRef } from "react";

export default function useInterval(callback: VoidFunction, delay: number | null = 1000) {
	const saveCallbackRef = useRef<VoidFunction>()

	useEffect(() => {
		saveCallbackRef.current = callback
	})

	useEffect(() => {
		function tick() {
			saveCallbackRef.current!()
		}

		if (delay !== null) {
			const timer = setInterval(tick, delay)
			return () => clearInterval(timer)
		}
	}, [delay])
}