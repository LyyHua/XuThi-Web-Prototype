import _ from 'lodash';
import React from 'react';
import { Grid, Search, Image } from 'semantic-ui-react';
import { ProductItems } from '../Product/ProductItems';
import { useNavigate } from 'react-router-dom';

const initialState = {
  loading: false,
  results: [],
  value: '',
};

function exampleReducer(state: any, action: any) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState;
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query };
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results };
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection };

    default:
      throw new Error();
  }
}

function SearchBar() {
  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;
  const navigate = useNavigate();

  const timeoutRef = React.useRef<number>();
  const handleSearchChange = React.useCallback((e: any, data: any) => {
    console.assert(typeof e !== 'undefined');
    clearTimeout(timeoutRef.current);
    dispatch({ type: 'START_SEARCH', query: data.value });

    timeoutRef.current = window.setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' });
        return;
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i');
      const isMatch = (result: any) => re.test(result.name) || re.test(result.id);

      const filteredResults = _.filter(ProductItems, isMatch);

      dispatch({
        type: 'FINISH_SEARCH',
        results: filteredResults.length > 0 ? filteredResults.map((item, index) => ({
          price: `Giá: ${Number(item.price).toLocaleString()}`,
          description: item.id,
          title: `${index+1}. ${item.name}`,
          image: item.photoURL,
        })) : [],
      });
    }, 300);
  }, [dispatch]);

  React.useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Search
      arial-label="Search"
      className='custom-search'
      aligned='right'
      size='large'
      loading={loading}
      onSearchChange={handleSearchChange}
      results={results}
      value={value}
      resultRenderer={({title, description, price, image}) => (
        <Grid onClick={() => navigate(`/sanpham/${description}`)}>
          <Grid.Column verticalAlign='middle' width={10}>
            <div className='title text-font'>{title}</div>
            <div className='description text-font'>Mã: {description}</div>
            <div className='price text-font'>{price}</div>
          </Grid.Column>
          <Grid.Column width={6}>
            <Image src={image} alt={title} />
          </Grid.Column>
        </Grid>
      )}
    />
  );
}

export default SearchBar;