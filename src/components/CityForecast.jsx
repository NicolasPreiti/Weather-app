import { useContext } from 'react';
import { Box, Flex, Text, Image, Heading } from '@chakra-ui/react';
import { ThemeContext } from '../context/ThemeProvider';
import { iconWeather } from '../../helpers/iconWeather';

//Detectar Drag en el mouse
window.addEventListener('mouseup', () => {
  document.querySelector('.slider').style.cursor = 'grab';
  isPressed = false;
});

let isPressed = false;
let cursorXSpace;

const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

//Limitar Drag a los bordes
const checkboundary = () => {
  const slider = document.querySelector('.slider');
  const innerSlider = document.querySelector('.innerSlider');

  let outer = slider.getBoundingClientRect();
  let inner = innerSlider.getBoundingClientRect();

  if (parseInt(innerSlider.style.left) > 0) {
    innerSlider.style.left = '0px';
  } else if (inner.right < outer.right) {
    innerSlider.style.left = `-${inner.width - outer.width}px`;
  }
};

export function CityForecast({ cityData }) {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <Flex direction={'column'} align={{ base: 'center', lg: 'start' }} gap={4}>
      <Heading fontFamily={'primary'} color={theme.colors.two}>
        Pronostico
      </Heading>
      <Flex
        className='slider'
        onMouseEnter={() => {
          document.querySelector('.slider').style.cursor = 'grab';
        }}
        onMouseDown={(evt) => {
          document.querySelector('.slider').style.cursor = 'grabbing';
          isPressed = true;
          cursorXSpace =
            evt.nativeEvent.offsetX - document.querySelector('.innerSlider').offsetLeft;
        }}
        onMouseMove={(evt) => {
          if (!isPressed) return;
          evt.preventDefault();
          document.querySelector('.innerSlider').style.left = `${
            evt.nativeEvent.offsetX - cursorXSpace
          }px`;
          checkboundary();
        }}
        pos={'relative'}
        justify={{ base: 'center', lg: 'start' }}
        w={'100%'}
        h={'240px'}
        overflow={'hidden'}
      >
        <Flex
          className='innerSlider'
          pos={'absolute'}
          top={0}
          left={0}
          gap={4}
          pointerEvents={'none'}
        >
          {cityData.dataForecast.list.map((forecast) => (
            <Flex
              pos={'relative'}
              direction={'column'}
              justify={'center'}
              align={'center'}
              w={'240px'}
              h={'240px'}
              borderRadius={'md'}
              boxShadow={'lg'}
              textShadow={`0px 0px 10px ${theme.colors.one}`}
              bg={theme.colors.one}
            >
              <Box
                as='picture'
                pos={'absolute'}
                zIndex={10}
                top={'0'}
                left={'0'}
                w={'50%'}
                overflow={'hidden'}
              >
                <Image
                  src={iconWeather(forecast.weather[0].main)}
                  w={'100%'}
                  h={'100%'}
                  transform={'scale(1.3)'}
                  objectFit={'cover'}
                />
              </Box>
              <Flex
                pos={'relative'}
                zIndex={100}
                direction={'column'}
                justify={'center'}
                w={'100%'}
                h={'100%'}
              >
                <Flex direction={'column'} align={'center'} mb={4}>
                  <Text fontSize={'5xl'}>{String(forecast.main.temp).split('.')[0]}°</Text>
                  <Text fontSize={'md'}>
                    Sensación: {String(forecast.main.feels_like).split('.')[0]}°
                  </Text>
                  <Text fontSize={'md'} textTransform={'capitalize'}>
                    {forecast.weather[0].description}
                  </Text>
                </Flex>

                <Flex justifySelf={'end'} direction={'column'} align={'center'}>
                  <Text
                    fontSize={'xl'}
                    fontWeight={'bold'}
                    letterSpacing={3}
                    textTransform={'capitalize'}
                  >
                    {days[new Date(forecast.dt_txt).getDay()]}
                  </Text>
                  <Text fontSize={'lg'} textTransform={'capitalize'}>
                    {forecast.dt_txt.split(' ')[1].split(':')[0] +
                      ':' +
                      forecast.dt_txt.split(' ')[1].split(':')[1]}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
