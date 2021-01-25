import React from 'react';
import Header from '../../components/Header';
import { Container} from 'react-bootstrap';

import ShortenerService from '../../services/ShortenerService';
import {parseISO, formatRelative} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {StatsContainer, StatsRow, StatsBox, StatsBoxTitle} from './styles';

class StatsPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isloading: false,
            shortenedURL: {},
            errorMessage: '',
        }
    }

    async componentDidMount(){
        const { code } = this.props.math.params;
        
        try {
            const service = new ShortenerService();
            const shortenedURL = await  service.getStats(code);
            const parsedDate = parseISO(shortenedURL.updateAt);
            const currentDate = new Date();
            const relativeDate = formatRelative(parsedDate, currentDate, {
                locale: ptBR,
            });

            shortenedURL.relativeDate = relativeDate;

            this.setState({isloading: false, shortenedURL})
        } catch (error) {
            this.setState({isloading: false, errorMessage: 'ops, url solicitada nao existe.'})
        }
    }

    render(){
        const {errorMessage, ShortenedURL } = this.state;

        return(
            <Container>
                <Header>Estatísticas</Header>
                {errorMessage ? (
                    <StatsContainer classNaeme= "text-center">
                        <FontAwesomeIcon size='3x' color="#f8d7da" icon="exclamation-triangle "/>
                        <p className="m-3">{errorMessage}</p>
                        <a className="btn btn-primary" href="/">Encurtar nova Url</a>
                    </StatsContainer>
                ) : (
                    <StatsContainer classNaeme= "text-center">
                        <p><b>https://pitu.tk/{ShortenedURL.code}</b></p>
                        <p>Redireciona para:<br/>{ShortenedURL.url}</p>
                        <StatsRow>
                            <StatsBox>
                                <b>{ShortenedURL.hits}</b>
                                <StatsBoxTitle>Visitas</StatsBoxTitle>
                            </StatsBox>
                        </StatsRow>
                        <StatsRow>
                            <StatsBox>
                                <b>{ShortenedURL.relativeDate}</b>
                                <StatsBoxTitle>Ùltima visita</StatsBoxTitle>
                            </StatsBox>
                        </StatsRow>
                        <a className="btn btn-primary" href="/">Encurtar nova Url</a>
                    </StatsContainer>
                    
                )}
            </Container>
        )
    }
}

export default StatsPage;