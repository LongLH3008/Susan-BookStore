import * as icon from "@/common/assets/icon";
import { customModalSearch } from "@/common/ui/CustomModalSearch";
import axios from "axios";
import { Modal } from "flowbite-react";
import { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";

interface SearchForm {
  search: string;
}

interface SearchState {
  query: string;
  suggestedKeywords: string[];
  isLoading: boolean;
}

type SearchAction =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_SUGGESTED_KEYWORDS'; payload: string[] }
  | { type: 'SET_LOADING'; payload: boolean };

const ResultKeyword = ({ suggestedKeywords }: { suggestedKeywords: string[] }) => {

  return (
    <div>
      {suggestedKeywords ? suggestedKeywords?.map((keyword: string, index: number) => (
        <Link
          to={"/cua-hang?q=" + keyword}
          className="w-full h-auto block p-2 border-b border-gray-200"
          key={index}
        >
          {keyword}
        </Link>
      )) : <div>Not found.</div>}
    </div>
  );
};

const searchReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload, isLoading: true };
    case 'SET_SUGGESTED_KEYWORDS':
      return { ...state, suggestedKeywords: action.payload, isLoading: false };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const DropdownSearch = () => {
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const [state, dispatch] = useReducer(searchReducer, {
    query: "",
    suggestedKeywords: [],
    isLoading: false,
  });

  useEffect(() => {
    setOpenModal(false);
  }, [location]);

  const { register, handleSubmit } = useForm<SearchForm>();

  const onSubmit = (data: SearchForm) => {
    console.log(data.search);
  };

  const fetchSuggestedKeywords = async (keyword: string) => {
    try {
      const {data} = await axios.post(`http://localhost:5000/api/v1/search`,{
        "input": keyword,
        "model": "nomic-ai/nomic-embed-text-v1.5",
        "dimensions": 512
      });     
      
      dispatch({ type: 'SET_SUGGESTED_KEYWORDS', payload: data });
      
    } catch (error) {
      console.error("Error fetching keywords:", error);
      dispatch({ type: 'SET_SUGGESTED_KEYWORDS', payload: [] });
    }
  };

  const suggestedKeyword = (keyword: string) => {
    dispatch({ type: 'SET_QUERY', payload: keyword });

    if (debounceTimeout) {
      clearTimeout(debounceTimeout); 
    }

    const newTimeout = setTimeout(() => {
      fetchSuggestedKeywords(keyword); 
    }, 1500);

    setDebounceTimeout(newTimeout); 
  };

  return (
    <>
      <button className="max-[1000px]:hidden" onClick={() => setOpenModal(true)}>
        <img width={32} src={icon.search} alt="" />
      </button>
      <Modal theme={customModalSearch} show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
            <label
              htmlFor="header_search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="header_search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-zinc-500 focus:border-zinc-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                placeholder="Tìm kiếm tên sách, tác giả, thể loại ..."
                {...register("search")}
                onChange={(e) => suggestedKeyword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800"
              >
                Tìm kiếm
              </button>
            </div>
          </form>
        </Modal.Header>
        <Modal.Body>
          <div id="result_header_search" className="p-4 pt-0 md:p-5">
            <div className="text-zinc-600 max-h-[300px] pb-5 grid gap-y-6 border-r overscrollHidden overflow-y-scroll scroll-smooth">
              {state.isLoading ? <div>Loading...</div> : <ResultKeyword suggestedKeywords={state.suggestedKeywords} />}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default DropdownSearch;
