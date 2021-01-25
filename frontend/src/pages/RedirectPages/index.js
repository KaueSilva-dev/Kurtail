import React from 'react';
import Header from '../../components/Header';
import {Container} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {StatsContainer} from './styles';

import ShortenerService from '../../Services/shortenerService';

class RedirectPage extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            isLoading: false,
            url: '',
            errorMessage:'',

        }
    }

    async componentDidMount(){
        const {code} = this.props.match.params;

        try {
            const service = new ShortenerService();
            const {url} = await service.getLInk(code);
            window.location = url;

        } catch (error) {
            this.setState({isLoading: false, errorMessage: 'Ops, essa url solicitada nao existe'})
        }
    }

    render(){
        const {errorMessage} = this.state;
        return(
            <Container>
                {errorMessage ?(
                    <>
                        <Header>
                            Seu Novo Encurtador de Url.
                        </Header>
                        <StatsContainer classNaeme= "text-center">
                        <FontAwesomeIcon size='3x' color="#f8d7da" icon="exclamation-triangle "/>
                        <p className="m-3">{errorMessage}</p>
                        <a className="btn btn-primary" href="/">Encurtar nova Url</a>
                    </StatsContainer>
                    </>
                ) : (
                    <p className="text-center">Redirecionando...</p>
                )}

            </Container>
        )
    }
}
export default RedirectPage;