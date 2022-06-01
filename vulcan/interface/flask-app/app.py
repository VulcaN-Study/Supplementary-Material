from flask import Flask, render_template, request, jsonify, json, abort, send_file
import os
import random
from flask_pymongo import PyMongo
from flask_misaka import Misaka


app = Flask(__name__, static_url_path='', static_folder='static')
app.config["MONGO_URI"] = "mongodb://root:MongoDB2020!@mongo:27017/advisory_db?authSource=admin"
app.config["JSONIFY_PRETTYPRINT_REGULAR"] =True;
mongo = PyMongo(app)
md = Misaka()
md.init_app(app)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/advisory")
def advisory():
    advisory_id = request.args['id']
    advisory = mongo.db.advisories.find_one_or_404({"advisoryData.id": int(advisory_id)})
    analysis = mongo.db.analysis.find_one({"advisory.id": str(advisory_id)})
    if analysis is None:
        analysis = {'analysis': []}
    cwe = advisory['advisoryData']['cwe']
    cwe = mongo.db.cwes.find_one({"cwe": str(cwe)})
    if cwe is None:
        cwe = {'name': ''}
    return render_template("advisory.html", advisory=advisory, advisory_id=advisory_id, analysis=analysis['analysis'], cwe_name=cwe['name'])

@app.route("/tool_report")
def tool_reports():
        advisory_id = request.args['id']
        tool=request.args['tool']
        analysis = mongo.db.analysis.find_one_or_404({"advisory.id": str(advisory_id)})
        analysis_list = analysis['analysis']
        for entry in analysis_list:
            if entry['tool'] == tool:
                return render_template("tool.html", tool=entry, advisory_id=advisory_id)
        return abort(404)

@app.route("/report")
def report():
    path = request.args['path']
    return send_file("/" + path, as_attachment=True)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
