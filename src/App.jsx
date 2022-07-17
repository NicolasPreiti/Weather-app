import { useState, useEffect, useContext } from 'react';
import {
  Box,
  Flex,
  FormControl,
  Input,
  Icon,
  Text,
  Image,
  Button,
  Heading,
} from '@chakra-ui/react';
import { TbMapSearch } from 'react-icons/tb';
import { getWeatherOf } from './services/getWeatherOf';
import { ThemeContext } from './context/ThemeProvider';
import { CityForecast } from './components/CityForecast';
import { iconWeather } from '../helpers/iconWeather';

function App() {
  const [citySearch, setCitySearch] = useState('argentina');
  const [cityData, setCityData] = useState({});
  const [unit, setUnit] = useState('metric');
  const { theme, changeTheme } = useContext(ThemeContext);

  useEffect(() => {
    getWeatherOf(citySearch, unit).then((data) => {
      if (!(data.dataCity.cod == '200')) setCityData(cityData);
      else if (data.dataCity.cod == '400') setCityData(cityData);
      else setCityData(data);
    });
  }, [citySearch, unit]);

  let isEmpty = citySearch === '';

  //Cambia la ciudad
  const handleSetCityValue = (evt) => {
    setCitySearch(evt.target.value);
  };

  return (
    <Flex
      as='div'
      fontFamily={'primary'}
      direction={{ base: 'column', lg: 'row' }}
      w={'100%'}
      minH={'100vh'}
      bg={'gray.100'}
    >
      <Flex
        as='section'
        width={{ base: '100%', lg: '40%' }}
        minH={'100vh'}
        h={{ base: '100vh', lg: 'inherit' }}
        boxShadow={'lg'}
      >
        <Flex
          direction={'column'}
          gap={4}
          w={'100%'}
          h={'100%'}
          px={2}
          py={10}
          color={theme.colors.two}
          bg={theme.colors.one}
        >
          <FormControl>
            <Flex
              align={'center'}
              maxW={'260px'}
              mx={'auto'}
              px={2}
              border={`2px solid ${theme.colors.two}`}
              borderRadius={'3xl'}
            >
              <Icon as={TbMapSearch} w={6} h={6} color={theme.colors.two} />
              <Input
                placeholder='Ingrese una ciudad'
                onChange={handleSetCityValue}
                border={'none'}
                outline={'none'}
                _hover={{}}
                _focus={{}}
              />
            </Flex>
          </FormControl>
          <Flex justify={'center'} gap={2}>
            <Button
              onClick={() => setUnit('metric')}
              boxShadow={'md'}
              color={unit == 'metric' ? theme.colors.three : theme.colors.two}
              bg={unit == 'metric' ? theme.colors.two : theme.colors.three}
              _hover={{ transform: 'scale(1.1)' }}
            >
              C°
            </Button>
            <Button
              onClick={() => setUnit('imperial')}
              boxShadow={'md'}
              color={unit == 'imperial' ? theme.colors.three : theme.colors.two}
              bg={unit == 'imperial' ? theme.colors.two : theme.colors.three}
              _hover={{ transform: 'scale(1.1)' }}
            >
              F°
            </Button>
          </Flex>

          <Flex
            fontFamily={'primary'}
            direction={'column'}
            align={'center'}
            w={'100%'}
            height={'100%'}
          >
            {Object.keys(cityData) == 0 ? (
              ''
            ) : (
              <>
                <Box w={'200px'} overflow={'hidden'}>
                  <Image
                    src={iconWeather(cityData.dataCity.weather[0].main)}
                    w={'100%'}
                    h={'100%'}
                    transform={'scale(1.5)'}
                    objectFit={'cover'}
                  />
                </Box>
                <Flex direction={'column'} align={'center'} mb={10}>
                  <Text fontSize={'8xl'} lineHeight={'100px'}>
                    {String(cityData.dataCity.main.temp).split('.')[0]}°
                  </Text>

                  <Text fontSize={'2xl'} fontWeight={'bold'}>
                    {' '}
                    Sensación: {String(cityData.dataCity.main.feels_like).split('.')[0]}°
                  </Text>

                  <Flex fontSize={'lg'} gap={3}>
                    <Text>Min: {String(cityData.dataCity.main.temp_min).split('.')[0]}°</Text>
                    <Text>Max: {String(cityData.dataCity.main.temp_max).split('.')[0]}°</Text>
                  </Flex>
                </Flex>

                <Flex gap={2}>
                  <Text fontSize={'2xl'} fontWeight={'bold'}>
                    {cityData.dataCity.name}
                  </Text>
                  <Text fontSize={'2xl'}>{cityData.dataCity.sys.country}</Text>
                </Flex>

                <Text fontSize={'xl'} textTransform={'capitalize'}>
                  {cityData.dataCity.weather[0].description}
                </Text>
              </>
            )}
          </Flex>

          <Flex justify={'center'}>
            <Button
              onClick={() => changeTheme(theme)}
              color={theme.colors.one}
              bg={theme.colors.two}
              _hover={{
                border: `2px solid ${theme.colors.two}`,
                color: theme.colors.two,
                bg: theme.colors.three,
              }}
            >
              Modo {theme.type == 'dark' ? 'claro' : 'oscuro'}
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        as={'section'}
        direction={'column'}
        gap={8}
        w={'100%'}
        minH={{ base: 'max-content', lg: '100vh' }}
        px={10}
        py={6}
        color={theme.colors.two}
        bg={theme.colors.three}
      >
        {Object.keys(cityData) == 0 ? (
          ''
        ) : (
          <>
            <CityForecast cityData={cityData} />

            <Flex direction={'column'} align={{ base: 'center', lg: 'start' }} gap={4}>
              <Heading fontFamily={'primary'} color={theme.colors.two}>
                Mas Datos
              </Heading>
              <Flex flexWrap={'wrap'} gap={4} justify={{ base: 'center', lg: 'start' }}>
                <Flex
                  direction={'column'}
                  justify={'center'}
                  align={'center'}
                  w={'240px'}
                  h={'240px'}
                  borderRadius={'md'}
                  boxShadow={'lg'}
                  bg={theme.colors.one}
                >
                  <Box w={'80px'} h={'80px'}>
                    <Image src={'images/humedad.png'} />
                  </Box>
                  <Text textTransform={'capitalize'}>
                    Humedad: {cityData.dataCity.main.humidity}
                  </Text>
                </Flex>

                <Flex
                  direction={'column'}
                  justify={'center'}
                  align={'center'}
                  w={'240px'}
                  h={'240px'}
                  borderRadius={'md'}
                  boxShadow={'lg'}
                  bg={theme.colors.one}
                >
                  <Box w={'80px'} h={'80px'}>
                    <Image src={'images/viento.png'} />
                  </Box>
                  <Text textTransform={'capitalize'}>Viento: {cityData.dataCity.wind.speed}</Text>
                </Flex>

                <Flex
                  direction={'column'}
                  justify={'center'}
                  align={'center'}
                  w={'240px'}
                  h={'240px'}
                  borderRadius={'md'}
                  boxShadow={'lg'}
                  bg={theme.colors.one}
                >
                  <Box w={'80px'} h={'80px'}>
                    <Image src={'images/nubes.png'} />
                  </Box>
                  <Text textTransform={'capitalize'}>Nubes: {cityData.dataCity.clouds.all}</Text>
                </Flex>

                <Flex
                  direction={'column'}
                  justify={'center'}
                  align={'center'}
                  w={'240px'}
                  h={'240px'}
                  borderRadius={'md'}
                  boxShadow={'lg'}
                  bg={theme.colors.one}
                >
                  <Box w={'80px'} h={'80px'}>
                    <Image src={'images/mar.png'} />
                  </Box>
                  <Text textTransform={'capitalize'}>Mar: {cityData.dataCity.main.sea_level}</Text>
                </Flex>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default App;
