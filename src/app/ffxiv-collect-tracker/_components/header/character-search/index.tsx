import CollectablesContext from '@/app/ffxiv-collect-tracker/_context/collectables';
import { cinzel } from '@/app/ffxiv-collect-tracker/_fonts';
import { XivIcon } from '@/common/assets/icons';
import {
  Autocomplete,
  AutocompleteChangeReason,
  Box,
  Button,
  CircularProgress,
  Portal,
  styled,
  TextField,
} from '@mui/material';
import { centeredPositionStyles } from '@/common/styles';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useState } from 'react';
import { OverlayBackground } from '../..';
import useCharacterSearch, {
  CharacterSearchResult,
} from './use-character-search';

const ChangeButton = styled(Button)(({ theme }) => ({
  fontFamily: cinzel.style.fontFamily,
  fontWeight: 400,
  borderColor: theme.palette.primary.contrastText,
  color: theme.palette.primary.contrastText,
}));

const ResultsContainer = styled(Box)({
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
});

const SearchContent = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  ...centeredPositionStyles,
  padding: theme.spacing(2),
  position: 'absolute',
  width: 600,
  '& .MuiTextField-root': {
    borderColor: theme.palette.primary.main,
  },
  '& .MuiIconButton-root': {
    color: theme.palette.primary.contrastText,
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  borderRadius: theme.spacing(0.5),
  '& .MuiInputBase-input': {
    color: theme.palette.primary.contrastText,
  },
}));

const CharacterSearch = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const { character } = useContext(CollectablesContext);
  const { results, loading, search } = useCharacterSearch();

  const handleSelectCharacter = (
    event: React.SyntheticEvent,
    newValue: CharacterSearchResult | null,
    reason: AutocompleteChangeReason,
  ) => {
    event.preventDefault();
    if (newValue && reason === 'selectOption') {
      router.push(`/ffxiv-collect-tracker/${newValue.id}`);
    }
  };

  const fetchNewResults = useCallback(
    debounce((updatedSearchValue: string) => {
      search(updatedSearchValue);
    }, 500),
    [],
  );

  return (
    <>
      <ChangeButton
        onClick={() => setShowSearchModal(true)}
        startIcon={<XivIcon />}
        variant="outlined"
      >
        {character?.name ?? 'Select Character'}
      </ChangeButton>
      {showSearchModal && (
        <Portal>
          <OverlayBackground>
            <SearchContent>
              <Autocomplete
                clearOnBlur={false}
                disabled={loading}
                filterOptions={(x) => x}
                getOptionLabel={(option) => option.name}
                inputValue={searchValue}
                onChange={handleSelectCharacter}
                onInputChange={(_event, newInputValue, reason) => {
                  if (reason === 'input') {
                    setSearchValue(newInputValue);
                    fetchNewResults(newInputValue);
                  }
                }}
                options={results}
                renderInput={(params) => (
                  <SearchField
                    {...params}
                    label="Search By Name..."
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading ? (
                              <CircularProgress size={24} color="primary" />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      },
                    }}
                    variant="filled"
                  />
                )}
                renderOption={(props, option) => {
                  const { ...optionProps } = props;
                  return (
                    <Box {...optionProps} key={option.id} component="li">
                      {option.name}
                    </Box>
                  );
                }}
                slots={{
                  paper: ResultsContainer,
                }}
                open={results.length > 0}
              />
            </SearchContent>
          </OverlayBackground>
        </Portal>
      )}
    </>
  );
};

export default CharacterSearch;
