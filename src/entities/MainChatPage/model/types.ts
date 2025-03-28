export interface ChatsData{
     id:string,
     name:string,
     model_id:string,
     user_id:string,
   }

   export interface LeftSideProps {
    toggleSidebar: () => void;
    leftBlockRef: React.RefObject<HTMLDivElement>;
  }

  export interface RightSideProps {
    rightBlockRef: React.RefObject<HTMLDivElement>;
  }