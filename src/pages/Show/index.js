import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import startCase from 'lodash/startCase';
import copyToClipBoard from 'copy-to-clipboard';
import {isMobile, isAndroid, isIOS} from 'react-device-detect';

import api from '../../services/api';

import { Container, Title, Button, GoBack, DownloadApp } from './styles';

export default function Account() {
  const history = useHistory();
  const { slug } = useParams();
  const [copiedLink, setCopiedLink] = useState(false);

  function handleShareLink() {
    api.post('/links', {
      slug,
    }).then(({ data }) => {
      copyToClipBoard(data);
      setCopiedLink(true);
    });
  }

  useEffect(() => {
    if(copiedLink) {
      setTimeout(() => {
        setCopiedLink(false);
      }, 3000);
    }
  }, [copiedLink])

  return (
    <Container>
      <Title>This page is for {startCase(slug)}</Title>

      {isMobile ? (
        <DownloadApp>
          <h3>Download App</h3>
          
          <div>
            <a href={isAndroid ? 'https://play.google.com/store/apps/details?id=com.instagram.android' : 'https://apps.apple.com/br/app/instagram/id389801252'} target="_blank">
              {isAndroid && 'Android'} {isIOS && 'IOS'} APP Download
            </a>
          </div>
        </DownloadApp>
      ) : (
        <>
          <Button type="button" onClick={handleShareLink} copiedLink={copiedLink}>
            {copiedLink ? 'Link Account copied to clipboard' : 'Share Link'}
          </Button>
          <GoBack onClick={() => history.back()}>Go Back</GoBack>
        </>
      )}
    </Container>
  )
}
