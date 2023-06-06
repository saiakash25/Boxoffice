import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getShowById } from "../api/tvmaze";
import ShowMainData from "../components/Shows/ShowMainData";
import Details from "../components/Shows/Details";
import Seasons from "../components/Shows/Seasons";
import Cast from "../components/Shows/Cast";

const Show = () => {
  const { showId } = useParams();

  const { data: showData, error: showError } = useQuery({
    queryKey: ["show", showId],
    queryFn: () => getShowById(showId),
    refetchOnWindowFocus: false,
  });

  

  // const {showData,showError}= useShowById(showId)
  if (showError) {
    return <div> We have an error:{showError.message}</div>;
  }
  if (showData) {
    return (
      <div>
        {/* <button type="button" onClick={onGoBack}>Go back to home</button> */}
        <Link to="/">Go back Home</Link>

        <ShowMainData
          image={showData.image}
          name={showData.name}
          rating={showData.rating}
          summary={showData.summary}
          genres={showData.genres}
        />
        <div>
          <h2>Details</h2>
          <Details
            status={showData.status}
            premiered={showData.premiered}
            network={showData.network}
          />
        </div>

        <div>
          <h2>Seasons</h2>
          <Seasons seasons={showData._embedded.seasons} />
        </div>
        <div>
          <h2>Cast</h2>
          <Cast cast={showData._embedded.cast} />
        </div>
      </div>
    );
  }

  return <div>Show page for {showId}</div>;
};
export default Show;

// const useShowById=(showId)=>{

//   const [showData,setShowData]=useState(null)
//   const [showError,setShowError]=useState(null)

//   useEffect(() => {
//     async function fetchData() {
//         try {
//             const data = await getShowById(showId);
//             setShowData(data)
//         } catch (err) {
//             setShowError(err)
//         }
//     }
//     fetchData()
//   }, [showId]);
//   return {showData,showError}
// }