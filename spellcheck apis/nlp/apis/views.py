from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from spellchecker import SpellChecker


# 1-  pyspellchecker



@api_view(["GET"])
def spellcheck(request,pk):
    #words=[]
    res=[]
    spell = SpellChecker()
    # data=request.data
    # x=data['spell']
    x=pk
    words=x.split()
    for x in words:
        corr=spell.correction(x)
        res.append(corr)
    val=" ".join(res)
    return Response({"result":val})