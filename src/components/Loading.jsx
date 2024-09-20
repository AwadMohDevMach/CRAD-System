import React, { cloneElement } from 'react'

const Loading = ({loading , error , children}) => {
  const elementType = children?.type?.render?.displayName;

  const renderHandler = () => {
    if(elementType === "Button"){
      const cloneButton = cloneElement(
        children,
        {disabled : true},
        "loading..."
      )
      return(
        <>
          {loading ? (
            cloneButton
          ) : error ? (
            <>
             {children}
             <p>{error}</p>
            </>
          ) : (
            children
          )} 
      </>
        )
    }
  //   return(
  //   <>
  //     {loading ? (
  //       cloneButton
  //     ) : error ? (
  //       <>
  //        {children}
  //        <p>{error}</p>
  //       </>
  //     ) : (
  //       children
  //     )} 
  // </>
  //   )
  }

  return renderHandler();
}

export default Loading
