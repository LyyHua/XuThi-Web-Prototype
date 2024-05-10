import _ from 'lodash';
import React from 'react';
import { Grid, Search, Image } from 'semantic-ui-react';
import { ProductItems } from '../Product/ProductItems';


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

  const timeoutRef = React.useRef<number>();
  const handleSearchChange = React.useCallback((data: any) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: 'START_SEARCH', query: data.value });

    timeoutRef.current = window.setTimeout(() => {
      if (data && data.value && data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' });
        return;
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i');
      const isMatch = (result: any) => re.test(result.name);

      const filteredResults = _.filter(ProductItems, isMatch);

      const results = filteredResults.map((item:any) => ({
        price: `Giá: ${Number(item.price).toLocaleString()}`,
        description: item.description,
        title: item.name,
        image: item.photoURL,
      }));

      dispatch({
        type: 'FINISH_SEARCH',
        results: results,
      });
    }, 300);
  }, []);

  React.useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Search
      className='custom-search'
      aligned='right'
      size='large'
      loading={loading}
      onResultSelect={(_, data) =>
        dispatch({ type: 'UPDATE_SELECTION', selection: data.result.name })
      }
      onSearchChange={handleSearchChange}
      results={results}
      value={value}
      resultRenderer={({title, description, price, image}) => (
        <Grid>
          <Grid.Column verticalAlign='middle' width={10}>
            <div className='title'>{title}</div>
            <div className='description'>{description}</div>
            <div className='price'>{price}</div>
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