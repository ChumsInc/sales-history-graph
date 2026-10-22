import useData from "@/components/useData.ts";
import {Button, Fade, ProgressBar} from "react-bootstrap";

export default function GraphStatusBar() {
    const {status, loadData} = useData();

    return (
        <div className="row g-3">
            <div className="col">
                <Fade in={status === 'loading'}>
                    <ProgressBar now={100} animated striped />
                </Fade>
            </div>
            <div className="col-auto">
                <Button type="button" size="sm" variant="primary" onClick={loadData}>Reload</Button>
            </div>
        </div>
    )
}
