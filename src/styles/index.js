import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
`;

export const ProgressBar = styled.View`
  background-color: #039ae5;
  height: 3;
  width: ${props => props.bar}%;
  align-items: flex-start;
`;

export const Skeleton = styled.View`
  height: 300;
  width: 100%;
  background-color: #ebebeb;
`;

export const Picture = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 300;
  width: 100%;
`;
