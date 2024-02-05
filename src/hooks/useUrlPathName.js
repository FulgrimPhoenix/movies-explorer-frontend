import { useLocation } from "react-router-dom"

export const useUrlPathName = () => {
  const currentLocation = useLocation();
  return currentLocation.pathname
}