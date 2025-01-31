import * as React from "react";
import Button from '../button/index'

export function BackButton({back}) {
  return (
    <div
      style={{
        marginTop: '-40rem',
        color: 'black',
        marginLeft: '-21px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.5rem'
      }}
    >
      {back && (
        <Button
          isTertiary={true}
          onClick={handleGoBack}
          scale='large'
        >
          {'<'}
          {getLocale('braveWelcomePreviousButtonLabel')}
        </Button>
      )}
    </div>
  )
}
