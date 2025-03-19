import Styles from "./page.module.css";

export default function Analysis() {
  return (
    <div>
      <main>
        <div className={Styles.page}>
          <div>Card list section</div>
          <div>Search section</div>
          <div>AI generated analysis section</div>
        </div>
      </main>
    </div>
  );
}
