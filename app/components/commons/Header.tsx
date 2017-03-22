import * as React from "react";
import { Router, Route, IndexRoute, Link, IndexLink, hashHistory } from 'react-router';
import Table from './Table';
import * as styles from './header.css';
import * as CSSModules from 'react-css-modules';
import {login, logout} from '../../stores/userActions';
import { connect } from 'react-redux'

const mapStateToProps = ({user}) => ({
  user
});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})
interface HeaderProps extends React.Props<any>{
  user: any;
  logout: any;
}
interface HeaderState{}
class Header extends React.Component<HeaderProps, HeaderState>{

  onSearch() {
    console.log('good');
  }
  onClick2 = (e) => {
    console.log('logout')
    this.props.logout();
    e.preventDefault();
  };
  subpanelStyles = {
    display: 'none'
  };
  aditionalStuff = () => {
    return (<span>
              <li>
                <IndexLink to="/foo" activeClassName={styles.active} activeStyle={{fontWeight: 'bold'}}>Foo</IndexLink>
              </li>
              <li>
                <Link to="/modes" activeClassName={styles.active} activeStyle={{fontWeight: 'bold'}}>Modes</Link>
              </li>
              <li>
                <Link to="/about" activeClassName={styles.active} activeStyle={{fontWeight: 'bold'}}>About</Link>
              </li>
              <li>
                <Link to="/examples" activeClassName={styles.active} activeStyle={{fontWeight: 'bold'}}>Examples</Link>
              </li>
            </span>)
  }

  render(){
    return  (
     <div className={styles.top_bar}>
        <div className="top_bar_left">
          <ul className={styles.menu}>
            <li className="menu_text product_logo">
              <div className="flonotes_logo" dangerouslySetInnerHTML={{__html: `<svg viewBox="0 0 800 600" version="1.1" xmlns="http://www.w3.org/2000/svg">
<g id="#60dfc0ff">
<path fill="#60dfc0" opacity="1.00" d=" M 393.48 124.90 C 395.43 123.58 397.88 124.12 400.09 123.98 C 408.72 124.11 417.36 123.79 425.99 124.14 C 426.37 124.33 427.13 124.71 427.51 124.90 C 430.48 125.30 433.80 124.27 436.52 125.86 C 438.52 126.10 440.75 125.62 442.52 126.83 C 444.19 127.06 446.06 126.73 447.51 127.82 C 449.18 128.01 450.96 127.91 452.49 128.74 C 453.83 128.99 455.20 129.18 456.48 129.67 C 457.51 129.96 458.51 130.32 459.49 130.76 C 460.83 130.99 462.22 131.12 463.49 131.67 C 464.48 131.99 465.48 132.32 466.47 132.68 C 467.47 132.99 468.46 133.32 469.46 133.68 C 470.89 134.09 472.27 134.67 473.64 135.27 C 475.30 135.96 476.99 136.55 478.64 137.26 C 480.99 138.19 483.35 139.09 485.60 140.26 C 486.92 140.97 488.26 141.65 489.63 142.29 C 490.13 142.53 491.12 143.02 491.61 143.26 C 492.54 143.75 493.47 144.25 494.40 144.74 C 506.66 150.85 517.77 159.11 528.05 168.06 C 535.64 174.41 543.18 181.90 546.26 191.55 C 547.38 193.35 548.07 195.36 548.23 197.48 C 549.44 199.60 548.88 202.13 549.11 204.45 C 550.50 206.49 549.81 209.10 549.81 211.41 C 548.17 213.83 549.72 216.98 548.32 219.51 C 548.01 220.51 547.67 221.51 547.32 222.50 C 547.03 223.50 546.70 224.49 546.33 225.47 C 545.84 227.19 545.12 228.82 544.32 230.41 C 539.25 239.11 532.03 246.76 522.62 250.72 C 522.13 250.98 521.13 251.49 520.64 251.75 C 518.03 252.89 515.33 253.87 512.50 254.25 C 509.20 255.67 505.48 254.76 502.01 255.01 C 499.19 254.75 496.03 255.73 493.48 254.19 C 491.81 254.01 490.11 253.95 488.53 253.34 C 486.40 252.67 484.38 251.72 482.39 250.72 C 481.90 250.48 480.91 249.98 480.42 249.73 C 475.41 247.35 471.09 243.72 467.26 239.74 C 464.15 236.41 460.28 233.95 456.60 231.30 C 451.93 228.03 446.63 225.85 441.58 223.26 C 440.55 222.97 439.54 222.65 438.54 222.31 C 437.53 221.98 436.53 221.65 435.54 221.30 C 434.51 220.98 433.50 220.63 432.51 220.24 C 431.12 219.99 429.69 219.90 428.45 219.17 C 426.45 218.92 424.29 219.21 422.49 218.12 C 414.50 217.71 406.50 217.74 398.51 218.12 C 397.00 219.09 395.17 218.95 393.49 219.21 C 392.19 219.72 390.83 219.98 389.49 220.29 C 388.17 220.70 386.81 220.98 385.47 221.28 C 384.47 221.65 383.46 221.98 382.44 222.27 C 380.84 223.12 379.17 223.83 377.41 224.24 C 375.13 225.43 372.81 226.54 370.51 227.68 C 366.40 230.12 362.37 232.65 358.68 235.70 C 352.89 239.54 348.73 245.16 344.28 250.36 C 343.28 252.22 341.70 253.67 340.70 255.53 C 339.78 257.24 338.69 258.86 337.70 260.53 C 337.21 261.48 336.73 262.43 336.25 263.38 C 335.61 264.74 334.94 266.10 334.23 267.43 C 333.81 269.21 333.18 270.97 332.11 272.47 C 332.03 272.96 331.87 273.94 331.79 274.43 C 330.43 277.30 330.43 280.61 329.15 283.52 C 328.99 285.15 328.87 286.79 328.71 288.42 C 327.79 289.78 327.97 291.44 327.92 293.00 C 327.94 298.81 327.79 304.63 328.08 310.44 C 329.20 312.26 328.87 314.48 329.16 316.52 C 330.21 320.16 331.50 323.78 332.16 327.53 C 333.13 329.07 333.81 330.77 334.20 332.55 C 335.40 334.82 336.51 337.15 337.65 339.46 C 338.67 341.12 339.76 342.74 340.66 344.48 C 343.19 348.48 346.43 351.95 349.24 355.74 C 354.02 360.98 359.74 365.27 365.52 369.34 C 367.24 370.26 368.87 371.34 370.55 372.35 C 371.48 372.82 372.42 373.30 373.36 373.78 C 374.73 374.42 376.09 375.10 377.44 375.80 C 379.22 376.23 380.93 376.91 382.49 377.89 C 382.97 377.98 383.93 378.15 384.41 378.23 C 385.75 378.79 387.13 379.28 388.48 379.84 C 390.16 380.05 391.90 380.11 393.48 380.83 C 394.78 381.00 396.10 381.16 397.41 381.35 C 401.74 382.93 406.55 381.48 410.99 382.79 C 414.74 381.87 418.63 382.25 422.45 381.89 C 425.72 380.87 429.14 380.41 432.51 379.81 C 433.50 379.43 434.49 379.08 435.50 378.76 C 436.50 378.40 437.51 378.07 438.52 377.75 C 439.53 377.40 440.54 377.08 441.57 376.79 C 445.59 374.80 449.63 372.82 453.62 370.76 C 465.00 363.69 474.70 354.06 481.72 342.63 C 483.98 337.40 487.96 331.75 494.37 332.11 C 495.36 332.69 496.43 333.05 497.59 333.19 C 501.23 334.63 503.60 338.05 504.00 341.90 C 504.58 346.00 501.56 349.24 499.72 352.57 C 497.40 356.82 494.47 360.69 491.56 364.55 C 489.52 367.51 486.38 369.50 484.50 372.59 C 482.96 375.04 480.12 376.13 478.23 378.24 C 475.65 381.05 472.32 382.98 469.38 385.37 C 467.32 387.21 467.84 390.21 467.92 392.68 C 469.06 393.78 470.19 394.91 471.31 396.06 C 476.52 397.23 480.77 393.55 484.30 390.26 C 495.68 381.33 505.11 370.01 512.31 357.48 C 513.10 355.85 513.91 354.24 514.75 352.63 C 515.39 351.28 516.06 349.94 516.74 348.61 C 517.37 347.25 518.05 345.91 518.76 344.58 C 519.12 342.80 519.85 341.14 520.73 339.56 C 521.00 338.53 521.31 337.51 521.67 336.51 C 521.97 335.49 522.33 334.49 522.75 333.52 C 522.98 332.15 523.13 330.76 523.74 329.50 C 523.99 328.14 524.17 326.75 524.76 325.48 C 525.01 324.11 524.91 322.61 525.88 321.48 C 525.17 316.38 528.41 310.89 533.50 309.66 C 535.06 308.91 537.12 308.49 538.51 309.86 C 539.02 309.91 540.05 310.01 540.56 310.07 C 543.04 311.31 544.76 313.60 545.91 316.05 C 545.91 319.18 546.67 322.64 545.18 325.53 C 544.97 327.20 545.11 328.99 544.24 330.51 C 544.01 331.85 543.94 333.27 543.26 334.50 C 543.00 335.84 542.79 337.20 542.34 338.49 C 542.01 339.49 541.67 340.48 541.32 341.48 C 541.01 342.48 540.67 343.48 540.32 344.47 C 539.99 345.46 539.66 346.45 539.32 347.44 C 538.70 349.59 537.72 351.62 536.70 353.61 C 535.96 355.56 535.26 357.55 534.27 359.41 C 534.02 359.90 533.50 360.89 533.25 361.39 C 533.01 361.89 532.53 362.91 532.29 363.42 C 531.43 364.81 530.50 366.15 529.73 367.59 C 527.93 370.53 526.25 373.56 524.34 376.43 C 522.64 378.82 520.91 381.20 519.05 383.46 C 518.81 386.16 518.81 388.88 519.04 391.59 C 520.22 393.88 521.91 395.88 524.40 396.79 C 525.47 397.06 526.51 397.43 527.53 397.89 C 528.02 397.89 528.99 397.89 529.47 397.89 C 530.48 397.44 531.53 397.07 532.60 396.78 C 533.69 396.17 534.88 395.68 535.79 394.80 C 539.97 389.25 543.82 383.47 547.28 377.45 C 548.71 374.45 551.04 371.31 554.51 370.67 C 557.35 369.03 560.56 370.53 563.09 372.03 C 567.19 374.83 568.30 380.69 566.03 385.01 C 556.21 402.46 543.63 418.35 528.55 431.54 C 525.84 433.07 524.22 435.97 521.35 437.26 C 515.68 442.48 509.12 446.66 502.56 450.66 C 498.45 453.41 493.94 455.42 489.57 457.71 C 486.19 459.20 483.06 461.28 479.46 462.23 C 477.89 463.12 476.21 463.80 474.45 464.21 C 472.88 465.11 471.19 465.77 469.46 466.26 C 468.47 466.60 467.48 466.92 466.49 467.25 C 465.49 467.60 464.49 467.94 463.48 468.28 C 461.79 468.75 460.05 469.04 458.42 469.71 C 457.94 469.83 456.97 470.08 456.49 470.20 C 454.82 470.74 453.10 471.10 451.42 471.59 C 448.49 472.33 445.53 472.96 442.51 473.18 C 440.65 474.08 438.53 473.90 436.54 474.14 C 433.67 475.57 430.27 474.28 427.38 475.62 C 416.15 476.14 404.85 476.16 393.62 475.60 C 391.08 474.61 388.29 475.01 385.64 474.64 C 383.36 473.68 380.79 474.12 378.50 473.22 C 376.82 472.95 375.10 472.82 373.50 472.22 C 369.44 471.58 365.39 470.70 361.56 469.21 C 359.15 468.78 356.81 468.09 354.55 467.20 C 351.83 466.35 349.09 465.53 346.55 464.23 C 344.81 463.75 343.15 463.05 341.56 462.22 C 337.97 461.20 334.80 459.18 331.43 457.65 C 327.71 455.77 323.95 453.95 320.45 451.66 C 300.64 439.82 282.85 424.46 269.19 405.82 C 262.78 397.63 257.20 388.80 252.77 379.39 C 250.72 375.10 248.23 370.99 246.78 366.45 C 245.97 364.82 245.27 363.14 244.74 361.41 C 244.40 360.43 244.07 359.45 243.75 358.47 C 243.40 357.47 243.06 356.47 242.74 355.47 C 242.40 354.48 242.08 353.49 241.77 352.49 C 240.93 350.21 240.21 347.87 239.77 345.47 C 239.27 343.79 238.90 342.08 238.40 340.41 C 237.07 335.01 236.20 329.51 235.27 324.04 C 234.87 321.51 235.46 318.82 234.38 316.43 C 233.85 305.50 233.86 294.50 234.38 283.57 C 235.48 281.19 234.85 278.49 235.27 275.97 C 236.20 270.49 237.07 265.00 238.40 259.60 C 238.89 257.93 239.26 256.22 239.76 254.56 C 240.22 252.17 240.90 249.82 241.77 247.55 C 242.08 246.53 242.40 245.52 242.74 244.52 C 243.06 243.53 243.40 242.54 243.76 241.57 C 244.62 238.85 245.46 236.12 246.77 233.59 C 248.07 229.30 250.48 225.48 252.32 221.42 C 260.88 203.38 273.34 187.42 287.32 173.30 C 298.11 163.55 309.52 154.21 322.42 147.31 C 324.69 145.85 327.00 144.43 329.44 143.25 C 330.50 142.76 331.56 142.24 332.63 141.75 C 335.08 140.32 337.71 139.26 340.38 138.31 C 342.37 137.28 344.38 136.25 346.57 135.70 C 347.83 135.22 349.12 134.80 350.37 134.28 C 351.73 133.69 353.10 133.13 354.51 132.66 C 355.80 132.20 357.16 131.99 358.50 131.74 C 359.47 131.31 360.47 130.96 361.50 130.68 C 362.75 130.08 364.15 129.98 365.51 129.76 C 366.69 128.95 368.14 128.98 369.50 128.78 C 370.69 127.97 372.14 127.99 373.51 127.78 C 375.01 126.85 376.80 127.02 378.48 126.82 C 380.59 125.56 383.14 126.13 385.46 125.89 C 387.80 124.27 390.83 125.28 393.48 124.90 Z" />
<path fill="#60dfc0" opacity="1.00" d=" M 499.53 304.56 C 502.48 303.51 505.91 303.64 508.68 305.18 C 511.20 306.28 512.71 308.69 513.91 311.03 C 514.12 313.34 514.12 315.68 513.91 317.99 C 512.68 320.32 511.23 322.76 508.68 323.81 C 504.69 326.05 499.13 325.51 496.20 321.80 C 492.57 318.90 491.86 313.30 494.24 309.42 C 495.68 307.49 497.47 305.81 499.53 304.56 Z" />
</g>
</svg>`}}></div>
              
              <IndexLink to="/" 
                activeClassName={styles.active}  
                activeStyle={{fontWeight: 'bold'}}>Flownotes</IndexLink></li>

            { this.props.user.data !== null ?

            <li>
              <IndexLink to="/" 
              activeClassName={styles.active} 
              activeStyle={{fontWeight: 'bold'}}>Pages</IndexLink>
            </li>
            : <li></li>}
              { this.props.user.data === null ?  
               <li>
                <IndexLink to="/login" 
                activeClassName={styles.active}  
                activeStyle={{fontWeight: 'bold'}}>Login</IndexLink>
               </li> : <span></span>
              }    
              { this.props.user.data === null ?                  
              <li>
                <IndexLink to="/signup" 
                activeClassName={styles.active}  
                activeStyle={{fontWeight: 'bold'}}>Sign Up</IndexLink>
               </li> : <span></span>
              }       
            { this.props.user.data !== null ?
             this.aditionalStuff() : <span></span>
            }
              { this.props.user.data !== null && this.props.user.data.username !== undefined ?  
              <li className="HeaderUserCredentials">
                <div className="HeaderUserCredentialsContainer">
                <span>{this.props.user.data.username + " "}</span>
                <a onClick={this.onClick2}>Log out</a></div>
              </li>  : ""            
              }
          </ul>
        </div>
        <div style={this.subpanelStyles} className={styles.primaryHeader__secondaryMenu + ' top_bar_right'}>
          <form onSubmit={this.onSearch}>
            <div className={styles.menu}>
              <div className={styles.primaryHeader__secondaryMenu_searchElement + " primaryHeader__secondaryMenu-searchInput"}>
                <input type="search" placeholder="Search notes"/>
              </div>
              <div className={styles.primaryHeader__secondaryMenu_searchElement + " primaryHeader__secondaryMenu-searchButton"}>
                <input type="submit" className="button" value="Create note"/>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)
