import imgOk from '../../src/blocks/popup/__info-img/info-img-ok.svg';
import imgCancel from '../../src/blocks/popup/__info-img/info-img-cancel.svg';

function InfoTooltip(props){
  return(
    <>
      <div className="popup popup_type_infotooltip">
        <div className="popup__container popup__container_type_info"> 

          <button
            type="button"
            className="popup__button-close popup__button-close_type_info button"
            aria-label="Закрыть"
            id="popup__button-close_info"
            onClick={props.onClose}
          ></button>
          <img className="popup__info-img" src={imgOk} />
          <p className="popup__info-title">Вы успешно зарегистрировались!</p>
        </div>
      </div>
    </>
  )
} 
export default InfoTooltip;
